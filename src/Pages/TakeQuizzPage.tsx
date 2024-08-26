import { ReactElement, useEffect } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { fetchQuizzToPass } from "../Store/quizzWorkflowSlice";
import useAppDispatch from "../Store/hooks/dispatch";
import { useSelector } from "react-redux";
import { selectCurrentCompany, selectRole } from "../Store/selectors/company_selector";
import { fetchCompanyById } from "../Store/companyProfileSlice";
import { getCompanyPath } from "../Utils/router";
import { selectQuizzWorkflowStatus, selectScore } from "../Store/selectors/quizz_workflow_selector";
import QuestionTake from "../Components/Quizz/QuestionTake";
import { withAuthentication } from "../Utils/hoc/auth_redirect";

const TakeQuizzPage = (): ReactElement => {
    const {companyId, quizzId} = useParams();
    const dispatch = useAppDispatch();
    const userRole = useSelector(selectRole);
    const company = useSelector(selectCurrentCompany);
    const status = useSelector(selectQuizzWorkflowStatus);
    const score = useSelector(selectScore);
    
    useEffect(() => {
        if (!companyId || !quizzId) return;
        if (company?.id !== companyId) {
            dispatch(fetchCompanyById(companyId));
        }
        dispatch(fetchQuizzToPass({quizzId}))
        window.onbeforeunload = () => 'Are you sure you want to leave?';
        return () => {
            window.onbeforeunload = null
        }
    }, [quizzId, companyId])

    if (company && userRole === "none") {
        return <Navigate to={getCompanyPath(company.id)} />
    }

    if (status === 'in_progress') {
        return (
            <div className="row">
                <div className="col-4 offset-4">
                    <QuestionTake/>
                </div>
            </div>
        )
    }

    if (status === 'finished') {
        let additionalClassNames = "alert-success";
        if (score && score < 60) {
            additionalClassNames = "alert-warning";
        }
        if (score && score < 40) {
            additionalClassNames = "alert-danger";
        }

        return (
            <div className="container d-flex">
                <div className={`alert ${additionalClassNames}`}>
                    <h4>Quizz completed with result {score}%</h4>
                    <Link to={getCompanyPath(company?.id || '')}>Return to company page</Link>
                </div>
            </div>
        )
    }

    return (
        <>

        </>
    )
}

export default withAuthentication(TakeQuizzPage);