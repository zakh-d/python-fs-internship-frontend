import { ReactElement, useEffect } from "react";
import { QuestionCreate } from "../../Types/QuizzTypes";
import useAppDispatch from "../../Store/hooks/dispatch";
import { addEditingEmptyAnswer, fetchAddQuestion, removeUnsavedQuestion, setEditingQuestionText} from "../../Store/quizzSlice";
import UnsavedAnswer from "./UnsavedAnswer";
import { validateQuestion } from "../../Utils/quizz_validator";
import { toast } from "react-toastify";

const QuestionInForm = ({question, quizzId, index, removable}: {quizzId: string, question: QuestionCreate, index: number, removable: boolean}): ReactElement => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        window.onbeforeunload = () => true;

        return () => {
            window.onbeforeunload = null;
        }
    }, []);

    return (
        <div className="form-group">
            <div className="input-group">
                <div className="input-group-text">
                    <b>Question {index + 1}</b>
                </div>
                <input className="form-control" type="text" id={`question_text_${index}`} value={question.text} onChange={(e) => {
                    dispatch(setEditingQuestionText({questionIndex: index, text: e.target.value}));
                }} placeholder={'Question text'} required/>
                {removable && <button className="btn btn-danger" type="button" onClick={() => {
                    dispatch(removeUnsavedQuestion());
                }}>Remove</button>}
            </div>
            <b className="text-warning">This question is unsaved</b>
            <div className="form-group p-4">
                
                {question.answers.map((answer, i) => <UnsavedAnswer answer={answer} questionIndex={index} index={i} removable={question.answers.length > 2}/>)}
                
                {question.answers.length < 4 && <button className="btn btn-secondary me-1" type="button" onClick={() => {
                    dispatch(addEditingEmptyAnswer({questionIndex: index}));
                }}>Add answer</button>}
                <button className="btn btn-success" onClick={() => {
                    const error = validateQuestion(question);
                    if (error) {
                        toast.error(error);
                        return;
                    }
                    dispatch(fetchAddQuestion({
                        quizzId: quizzId,
                        questionData: {
                            text: question.text,
                            answers: question.answers.map(answer => ({text: answer.text, is_correct: answer.is_correct}))
                        }
                    }));
                }}>Save Question</button>
            </div>
        </div>
    )
}

export default QuestionInForm;