import { Link } from "react-router-dom";
import { QuizzWithoutQuestions } from "../../Types/QuizzTypes";
import { getQuizzPath, getTakeQuizzPath } from "../../Utils/router";
import { selectRole } from "../../Store/selectors/company_selector";
import { useSelector } from "react-redux";
import Company from "../../Types/CompanyType";
import useAppDispatch from "../../Store/hooks/dispatch";
import { downloadQuizzResponses } from "../../Store/quizzSlice";

const QuizzCard = ({ quizz, deleteQuizz, company}: { quizz: QuizzWithoutQuestions, deleteQuizz: (quizzId: string) => void, company: Company}) => {
    const userRole = useSelector(selectRole);
    const dispatch = useAppDispatch();
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{quizz.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted text-body-secondary">Frequency: {quizz.frequency}</h6>
                <p className="card-text">{quizz.description}</p>
                {(userRole === 'owner' || userRole === 'admin') &&
                <>
                <Link className="btn btn-outline-primary me-1" to={getQuizzPath(company.id, quizz.id)}>Edit</Link>
                <button className="btn btn-outline-danger me-1" onClick={() => {
                    deleteQuizz(quizz.id);
                }}>Delete</button>
                <button className="btn btn-success me-1" onClick={() => {
                    dispatch(downloadQuizzResponses({
                        quizzId: quizz.id,
                        format: "csv"
                    }))
                }}>
                    Download
                </button>
                </>
                }
                <Link to={getTakeQuizzPath(company.id, quizz.id)} className="btn btn-primary">Take</Link>
            </div>
        </div>
    )
}

export default QuizzCard;