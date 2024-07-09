import ModalWindow from "../Components/ModalWindow";
import { useDispatch, useSelector } from "react-redux";
import { selectTestString } from "../Store/selectors/test_selector";
import { changeTestString } from "../Store/testSlice";
import { ReactElement } from "react";

const Start = (): ReactElement => {

    const testString = useSelector(selectTestString);
    const dispatch = useDispatch();

    return (
        <section className="container-fluid">
            
            <ModalWindow isOpen={true} onClose={() => {
                dispatch(changeTestString("Hi there again!"))
            }}>
                <h2>Welcome o my website</h2>
                <p>{testString}</p>
            </ModalWindow>
        </section>
    );
}

export default Start;