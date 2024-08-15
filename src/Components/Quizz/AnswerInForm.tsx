import { ReactElement } from "react";
import { AnswerCreate } from "../../Types/QuizzTypes";
import useAppDispatch from "../../Store/hooks/dispatch";
import { removeAnswer, setAnswerCorrect, setAnswerText } from "../../Store/quizzSlice";

const AnswerInForm = ({ answer, questionIndex, index, removable }: {answer: AnswerCreate, questionIndex: number, index: number, removable: boolean}): ReactElement => {
    const dispatch = useAppDispatch();
    return (
        <div className="input-group mb-3">
            <div className="input-group-text">
                <input className="form-check-input mt-0" type="checkbox" checked={answer.is_correct} onChange={(e) => {
                    dispatch(setAnswerCorrect({
                        questionIndex, answerIndex: index,
                        isCorrect: e.target.checked
                    }));
                }} aria-label="Checkbox for following text input"/>
            </div>
            <input type="text" className="form-control" value={answer.text} onChange={(e) => {
                dispatch(setAnswerText({questionIndex, answerIndex: index, text: e.target.value}));
            }} aria-label="Text input with checkbox" placeholder={`Option ${index + 1}`} required/>
            {removable && <button className="btn btn-outline-danger" type="button" onClick={() => {
                dispatch(removeAnswer({questionIndex, answerIndex: index}));
            }}>Remove</button>}
        </div>

    )
}

export default AnswerInForm;