import { useSelector } from "react-redux"
import QuizzEdit from "../Components/Quizz/QuizzEdit"
import { selectCurrentQuizz } from "../Store/selectors/quizzSelector"
import { ReactElement, useEffect } from "react"
import { Navigate, useParams } from "react-router-dom"
import useAppDispatch from "../Store/hooks/dispatch"
import { fetchQuizzWithCorrectAnswers } from "../Store/quizzSlice"
import { withAuthentication } from "../Utils/hoc/auth_redirect"
import { selectCompanyProfileLoading, selectCurrentCompany, selectRole } from "../Store/selectors/company_selector"
import { getCompanyQuizzPath } from "../Utils/router"
import { fetchCompanyById } from "../Store/companyProfileSlice"
import Loader from "../Components/Loader"

const QuizzEditPage = (): ReactElement => {
    const {companyId, quizzId} = useParams();
    const quizz = useSelector(selectCurrentQuizz)
    const dispatch = useAppDispatch();
    const company = useSelector(selectCurrentCompany);
    const userRole = useSelector(selectRole);
    const loading = useSelector(selectCompanyProfileLoading);


    useEffect(() => {
        if (companyId && (!company || company.id !== companyId)) {
         dispatch(fetchCompanyById(companyId));
        }    
        if (quizzId)
        {
            dispatch(fetchQuizzWithCorrectAnswers(quizzId));
        }
    }, [companyId, quizzId])

    if (loading) {
        return <Loader/>
    }

    if (!company) {
        return <div>Company not found</div>
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