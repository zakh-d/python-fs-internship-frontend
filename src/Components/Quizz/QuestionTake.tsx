import { useSelector } from "react-redux";
import {
  selectCurrentQuestion,
  selectCurrentQuestionAnswers,
  selectIsLastQuestion,
  selectQuizzResponse,
} from "../../Store/selectors/quizz_workflow_selector";
import useAppDispatch from "../../Store/hooks/dispatch";
import {
  nextQuestion,
  uncheckAnswer,
  checkAnswer,
  fetchCompleteQuizz,
} from "../../Store/quizzWorkflowSlice";

const QuestionTake = () => {
  const question = useSelector(selectCurrentQuestion);
  const selectedAnswers = useSelector(selectCurrentQuestionAnswers);
  const lastQuestion = useSelector(selectIsLastQuestion);
  const quizzResponse = useSelector(selectQuizzResponse);

  const dispatch = useAppDispatch();

  if (!question) {
    return <div>Quizz Error</div>;
  }
  return (
    <div>
        <h3 >{question.text}</h3>
        <hr />
        <div className="mb-4">
            {question.answers.map((answer) => (
            <div key={answer.id}>
                <div className="input-group">
                <div className="input-group-text">
                    <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectedAnswers.includes(answer.id)}
                    onChange={(e) => {
                        if (e.target.checked) {
                        dispatch(checkAnswer(answer.id));
                        } else {
                        dispatch(uncheckAnswer(answer.id));
                        }
                    }}
                    />
                </div>
                <input
                    className="form-control"
                    type="text"
                    value={answer.text}
                    disabled
                />
                </div>
            </div>
            ))}
        </div>
        {lastQuestion && <button className="btn btn-primary" onClick={() => {
            if (!quizzResponse) return;
            dispatch(fetchCompleteQuizz({data: quizzResponse}));
        }} disabled={selectedAnswers.length === 0}>Finish</button>}
        {!lastQuestion && (
            <>
                <button className="btn btn-primary" onClick={() => dispatch(nextQuestion())} disabled={selectedAnswers.length === 0}>Next Question</button>
            </>
        )}
        {selectedAnswers.length === 0 && <div className="text-warning">Please select at least one answer</div>}
    </div>
  );
};

export default QuestionTake;
