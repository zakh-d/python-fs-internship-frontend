import { Link } from "react-router-dom";
import { QuizzWithoutQuestions } from "../../Types/QuizzTypes";
import { getQuizzPath } from "../../Utils/router";
import { selectRole } from "../../Store/selectors/company_selector";
import { useSelector } from "react-redux";
import Company from "../../Types/CompanyType";

const QuizzCard = ({ quizz, deleteQuizz, company}: { quizz: QuizzWithoutQuestions, deleteQuizz: (quizzId: string) => void, company: Company}) => {
    const userRole = useSelector(selectRole);

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{quizz.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted text-body-secondary">Frequency: {quizz.frequency}</h6>
                <p className="card-text">{quizz.description}</p>
                {(userRole === 'owner' || userRole === 'admin') &&
                <>
                <Link className="btn btn-outline-primary me-1" to={getQuizzPath(company.id, quizz.id)}>Edit</Link>
                <button className="btn btn-outline-danger" onClick={() => {
                    deleteQuizz(quizz.id);
                }}>Delete</button>
                </>
            }
            </div>
        </div>
    )
}

export default QuizzCard;