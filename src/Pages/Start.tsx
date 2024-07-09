import {ReactElement} from "react";
import ModalWindow from "../Components/ModalWindow";

const Start = (): ReactElement => {
    return (
        <section className="container-fluid">
            
            <ModalWindow isOpen={true} onClose={() => {}}>
                <h2>Welcome o my website</h2>
            </ModalWindow>
        </section>
    );
}

export default Start;