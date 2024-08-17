import { ReactElement } from "react";
import { Question } from "../../Types/QuizzTypes";
import useAppDispatch from "../../Store/hooks/dispatch";
import { deleteQuestion, fetchAddAnswer, setEditingQuestionText, updateQuestion} from "../../Store/quizzSlice";
import SwitchInput from "./SwitchInput";
import AnswerEdit from "./AnswerEdit";

const QuestionInForm = ({question, index, removable, quizzId}: {question: Question, index: number, removable: boolean, quizzId: string}): ReactElement => {
    const dispatch = useAppDispatch();
    return (
        <div className="form-group">
                
            <div className="input-group">
                <div className="input-group-text">
                    <b>Question {index + 1}</b>
                </div>
                <SwitchInput value={question.text} changeHandler={(value) => {
                    dispatch(setEditingQuestionText({questionIndex: index, text: value}));
                }} save={() => {
                    dispatch(updateQuestion({quizzId: quizzId, questionId: question.id, text: question.text}));
                }}/>
                {removable && <button className="btn btn-danger" type="button" onClick={() => {
                    dispatch(deleteQuestion({quizzId, questionId: question.id}));
                }}>Delete</button>}
            </div>
            <div className="form-group p-4">
                
                {question.answers.map((answer, i) => <AnswerEdit answer={answer} quizzId={quizzId} questionIndex={index} index={i} removable={question.answers.length > 2}/>)}
                
                {question.answers.length < 4 && <button className="btn btn-secondary" type="button" onClick={() => {
                    dispatch(fetchAddAnswer({
                        quizzId, questionId: question.id,
                        answerData: {
                            text: "New Option",
                            is_correct: false
                        }
                    }));
                }}>Add answer</button>}
            </div>
        </div>
    )
}

export default QuestionInForm;