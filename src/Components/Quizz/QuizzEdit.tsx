import { ReactElement } from "react";
import { Quizz } from "../../Types/QuizzTypes";
import SwitchInput from "./SwitchInput";
import SwitchTextArea from "./SwitchTextArea";
import QuestionEdit from "./QuestionEdit";
import useAppDispatch from "../../Store/hooks/dispatch";
import { addNewQuestion } from "../../Store/quizzSlice";
import UnsavedQuestion from "./UnsavedQuestion";

const QuizzEdit = ({quizz}: {quizz: Quizz}): ReactElement => {

    const dispatch = useAppDispatch();

    return (
        <div>
            <p className="text-muted">Double click on value to start editing</p>
            <div className="input-group mb-2">
                <label className="input-group-text" style={{width: 150}}>Title</label>
                <SwitchInput value={quizz.title} changeHandler={(value) => console.log(value)} save={() => {

                }}/>
            </div>
            <div className="input-group mb-2">
                <label className="input-group-text" style={{width: 150}}>Description</label>
                <SwitchTextArea value={quizz.description} changeHandler={(value) => console.log(value)}/>
            </div>
            <div className="input-group">
                <label className="input-group-text" style={{width: 150}}>Frequency</label>
                <SwitchInput value={quizz.frequency.toString()} changeHandler={(value) => console.log(value)} save={() => {

                }}/>
            </div>
            
            <h3 className="my-4">Questions</h3>

            {quizz.questions.map((question, index) => {
                if (question.id === 'new_question') {
                    return <UnsavedQuestion quizzId={quizz.id} index={index} question={question} removable={quizz.questions.length > 1} />
                }
                return <QuestionEdit quizzId={quizz.id} index={index} question={question} removable={quizz.questions.length > 1} />
    })}
            <button className="btn btn-success" type="button" onClick={() => dispatch(addNewQuestion())}
                    disabled={quizz.questions.some(question => question.id === 'new_question')}>Add question</button>
            {quizz.questions.some(question => question.id === 'new_question') && <p className="text-warning">Please save the new question before adding another</p>}
            <br /><br /><br />
        </div>
    )
}

export default QuizzEdit;