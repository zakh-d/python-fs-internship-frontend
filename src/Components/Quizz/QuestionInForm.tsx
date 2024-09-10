import { ReactElement } from "react";
import { QuestionCreate } from "../../Types/QuizzTypes";
import AnswerInForm from "./AnswerInForm";
import useAppDispatch from "../../Store/hooks/dispatch";
import { addEmptyAnswer, removeQuestion, setQuestionText } from "../../Store/quizzSlice";

const QuestionInForm = ({question, index, removable}: {question: QuestionCreate, index: number, removable: boolean}): ReactElement => {
    const dispatch = useAppDispatch();
    return (
        <div className="form-group">
                
            <div className="input-group">
                <div className="input-group-text">
                    <b>Question {index + 1}</b>
                </div>
                <input className="form-control" type="text" id={`question_text_${index}`} value={question.text} onChange={(e) => {
                    dispatch(setQuestionText({questionIndex: index, text: e.target.value}));
                }} placeholder={'Question text'} required/>
                {removable && <button className="btn btn-danger" type="button" onClick={() => {
                    dispatch(removeQuestion(index));
                }}>Remove</button>}
            </div>
            <div className="form-group p-4">
                
                {question.answers.map((answer, i) => <AnswerInForm answer={answer} questionIndex={index} index={i} removable={question.answers.length > 2}/>)}
                
                {question.answers.length < 4 && <button className="btn btn-secondary" type="button" onClick={() => {
                    dispatch(addEmptyAnswer({questionIndex: index}));
                }}>Add answer</button>}
            </div>
        </div>
    )
}

export default QuestionInForm;