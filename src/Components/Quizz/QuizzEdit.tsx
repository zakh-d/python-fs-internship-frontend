import { ReactElement } from "react";
import { Quizz } from "../../Types/QuizzTypes";
import SwitchInput from "./SwitchInput";
import SwitchTextArea from "./SwitchTextArea";
import QuestionEdit from "./QuestionEdit";

const QuizzEdit = ({quizz}: {quizz: Quizz}): ReactElement => {
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

            {quizz.questions.map((question, index) => <QuestionEdit quizzId={quizz.id} index={index} question={question} removable={quizz.questions.length > 1} />)}
            
        </div>
    )
}

export default QuizzEdit;