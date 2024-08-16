import { ReactElement, useEffect } from "react"
import QuestionInForm from "./QuestionInForm";
import { useSelector } from "react-redux";
import { selectQuizzBeingCreated } from "../../Store/selectors/quizzSelector";
import useAppDispatch from "../../Store/hooks/dispatch";
import { addEmptyQuestion, clearQuizzForm, createQuizz, setQuizzDescription, setQuizzFrequency, setQuizzTitle } from "../../Store/quizzSlice";
import { quizzCreateValidator } from "../../Utils/quizz_validator";
import { toast } from "react-toastify";
import Company from "../../Types/CompanyType";


const QuizzForm = ({company}: {company: Company}): ReactElement => {
    
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        window.onbeforeunload = () => "Unsaved changes will be lost. Are you sure you want to leave?";
        dispatch(clearQuizzForm());
        return () => {
            window.onbeforeunload = null;
        }
    }, []);


    const quizz = useSelector(selectQuizzBeingCreated);

    return (
        <form className="form" onSubmit={(e) => {
            e.preventDefault();
            const error = quizzCreateValidator(quizz);
            if (error) {
                toast.error(error);
                return;
            }
            dispatch(createQuizz(company.id));
        }}>
            <div className="form-group">
                <label className="form-label" htmlFor="title">Title</label>
                <input className="form-control" type="text" id="title" name="title" value={quizz.title} onChange={(e) => {
                    dispatch(setQuizzTitle(e.target.value));
                }} required/>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="description">Description</label>
                <textarea className="form-control" id="description" name="description" value={quizz.description} onChange={(e) => {
                    dispatch(setQuizzDescription(e.target.value));
                }} required/>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="frequency">Frequency</label>
                <input className="form-control" type="number" id="frequency" name="frequency" value={quizz.frequency} onChange={(e) => {
                    dispatch(setQuizzFrequency(parseInt(e.target.value)));
                }} required/>
            </div>
            
            <div className="form-group">
                <h3 className="my-4">Questions</h3>
                <hr />

                {quizz.questions.map((question, index) =>
                <div className="mb-4">
                    <QuestionInForm question={question} index={index} removable={quizz.questions.length > 1}/>
                </div>)}

                <button className="btn btn-success" type="button" onClick={() => dispatch(addEmptyQuestion())}>Add question</button>
            </div>
            <hr />
            <button className="btn btn-outline-primary">Submit</button>
        </form>
    )
}

export default QuizzForm;