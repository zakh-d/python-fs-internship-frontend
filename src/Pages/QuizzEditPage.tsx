import { useSelector } from "react-redux"
import QuizzEdit from "../Components/Quizz/QuizzEdit"
import { selectCurrentQuizz } from "../Store/selectors/quizzSelector"
import { ReactElement, useEffect } from "react"
import { useParams } from "react-router-dom"
import useAppDispatch from "../Store/hooks/dispatch"
import { fetchQuizzWithCorrectAnswers } from "../Store/quizzSlice"
import { withAuthentication } from "../Utils/hoc/auth_redirect"

const QuizzEditPage = (): ReactElement => {
    const {quizzId} = useParams();
    const quizz = useSelector(selectCurrentQuizz)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!quizzId) return;
        dispatch(fetchQuizzWithCorrectAnswers(quizzId));
    }, [quizzId])

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