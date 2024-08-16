import { ReactElement } from "react";
import { QuizzWithoutQuestions } from "../../Types/QuizzTypes";
import QuizzCard from "./QuizzCard";

const QuizzCardList = ({quizzes}: {quizzes: QuizzWithoutQuestions[]}):ReactElement => {

    return (
        <div className="row">
            {quizzes.map((quizz) => (
                <div className="col-lg-4 col-md-6">
                    <QuizzCard key={quizz.id} quizz={quizz}/>
                </div>
            ))}
        </div>
    )
}

export default QuizzCardList;