import { Link } from "react-router-dom";
import { QuizzWithoutQuestions } from "../../Types/QuizzTypes";
import { getQuizzPath } from "../../Utils/router";

const QuizzCard = ({ quizz }: { quizz: QuizzWithoutQuestions }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{quizz.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted text-body-secondary">Frequency: {quizz.frequency}</h6>
                <p className="card-text">{quizz.description}</p>
                <Link to={getQuizzPath(quizz.id)}>Edit</Link>
            </div>
        </div>
    )
}

export default QuizzCard;