import { useSelector } from "react-redux"
import QuizzEdit from "../Components/Quizz/QuizzEdit"
import { selectCurrentQuizz } from "../Store/selectors/quizzSelector"
import { ReactElement, useEffect } from "react"
import { Navigate, useParams } from "react-router-dom"
import useAppDispatch from "../Store/hooks/dispatch"
import { fetchQuizzWithCorrectAnswers } from "../Store/quizzSlice"
import { withAuthentication } from "../Utils/hoc/auth_redirect"
import { selectCurrentCompany, selectRole } from "../Store/selectors/company_selector"
import { getCompanyQuizzPath, getMyCompanyListPath } from "../Utils/router"

const QuizzEditPage = (): ReactElement => {
    const {quizzId} = useParams();
    const quizz = useSelector(selectCurrentQuizz)
    const dispatch = useAppDispatch();

    const userRole = useSelector(selectRole);
    const company = useSelector(selectCurrentCompany);

    useEffect(() => {
        if (!quizzId) return;
        dispatch(fetchQuizzWithCorrectAnswers(quizzId));
    }, [quizzId])

    if (!company) {
        return <Navigate to={getMyCompanyListPath()}/>
    }

    if (userRole === 'none' || userRole === 'member') {
        return <Navigate to={getCompanyQuizzPath(company.id)}/>
    }

    if (!quizz) {
        return <div>Quizz not found</div>
    }
    return (
        <div className="container">
            <QuizzEdit quizz={quizz} />
        </div>
    )   
}

export default withAuthentication(QuizzEditPage);