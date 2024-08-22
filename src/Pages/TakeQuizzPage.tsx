import { ReactElement, useEffect } from "react"
import { Navigate, useParams } from "react-router-dom"
import { fetchQuizzToPass } from "../Store/quizzWorkflowSlice";
import useAppDispatch from "../Store/hooks/dispatch";
import { useSelector } from "react-redux";
import { selectCurrentCompany, selectRole } from "../Store/selectors/company_selector";
import { fetchCompanyById } from "../Store/companyProfileSlice";
import { getCompanyPath } from "../Utils/router";
import { selectQuizzWorkflowStatus } from "../Store/selectors/quizz_workflow_selector";
import QuestionTake from "../Components/Quizz/QuestionTake";

const TakeQuizzPage = (): ReactElement => {
    const {companyId, quizzId} = useParams();
    const dispatch = useAppDispatch();
    const userRole = useSelector(selectRole);
    const company = useSelector(selectCurrentCompany);
    const status = useSelector(selectQuizzWorkflowStatus);
    
    useEffect(() => {
        if (status === 'in_progress') return;
        if (!companyId || !quizzId) return;
        if (company?.id !== companyId) {
            dispatch(fetchCompanyById(companyId));
        }
        dispatch(fetchQuizzToPass({quizzId}))
    }, [quizzId, companyId])

    if (company && userRole === "none") {
        return <Navigate to={getCompanyPath(company.id)} />
    }

    return (
        <>
            {status === 'in_progress' && 
            <div className="row">
                <div className="col-4 offset-4">
                    <QuestionTake/>
                </div>
            </div>
            }
        </>
    )
}

export default TakeQuizzPage;