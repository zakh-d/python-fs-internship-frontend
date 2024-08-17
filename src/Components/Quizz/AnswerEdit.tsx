import { ReactElement } from "react";
import { Answer } from "../../Types/QuizzTypes";
import useAppDispatch from "../../Store/hooks/dispatch";
import { fetchDeleteAnswer, setEditingAnswerText, updateAnswer } from "../../Store/quizzSlice";
import SwitchInput from "./SwitchInput";

const AnswerEdit = ({ answer, questionIndex, quizzId, index, removable }: {answer: Answer, questionIndex: number, quizzId: string, index: number, removable: boolean}): ReactElement => {
    const dispatch = useAppDispatch();
    
    return (
        <div className="input-group mb-3">
            <div className="input-group-text">
                <input className="form-check-input mt-0" type="checkbox" checked={answer.is_correct} onChange={(e) => {
                    dispatch(updateAnswer({text: answer.text, is_correct: e.target.checked, quizzId, answerId: answer.id}));
                }} aria-label="Checkbox for following text input"/>
            </div>
            <SwitchInput value={answer.text} changeHandler={(value) => {
                dispatch(setEditingAnswerText({questionIndex, answerIndex: index, text: value}));
            } } save={() => {
                dispatch(updateAnswer({text: answer.text, is_correct: answer.is_correct, quizzId, answerId: answer.id}));
            }}/>
            {removable && <button className="btn btn-outline-danger" type="button" onClick={() => {
                dispatch(fetchDeleteAnswer({quizzId, answerId: answer.id}));
            }}>Delete</button>}
        </div>


    )
}

export default AnswerEdit;