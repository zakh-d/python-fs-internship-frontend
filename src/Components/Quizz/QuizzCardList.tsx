import { ReactElement, useState } from "react";
import { QuizzWithoutQuestions } from "../../Types/QuizzTypes";
import QuizzCard from "./QuizzCard";
import ModalWindow from "../ModalWindow";
import { fetchDeleteQuizz } from "../../Store/quizzSlice";
import useAppDispatch from "../../Store/hooks/dispatch";

const QuizzCardList = ({quizzes}: {quizzes: QuizzWithoutQuestions[]}):ReactElement => {

    const [confirmWindowOpen, setConfirmWindowOpen] = useState(false);
    const [choosenQuizzId, setChoosenQuizzId] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    return (
        <>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {quizzes.map((quizz) => (
                <div className="col">
                    <QuizzCard deleteQuizz={(quizzId: string) => {
                        setConfirmWindowOpen(true);
                        setChoosenQuizzId(quizzId);
                    }} key={quizz.id} quizz={quizz}/>
                </div>
            ))}
        </div>
        <ModalWindow isOpen={confirmWindowOpen} onClose={() => {
            setChoosenQuizzId(null);
            setConfirmWindowOpen(false);
        } }>
            <h4 className="text-danger">Are you sure you want to delete this quizz?</h4>
            <button className="btn btn-danger" onClick={() => {
                if (choosenQuizzId) {
                    dispatch(fetchDeleteQuizz({quizzId: choosenQuizzId}));
                }
                setChoosenQuizzId(null);
                setConfirmWindowOpen(false);
            }}>Delete</button>
        </ModalWindow>
        </>
    )
}

export default QuizzCardList;