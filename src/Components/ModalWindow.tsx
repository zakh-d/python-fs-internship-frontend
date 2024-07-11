import { useState } from "react";
import { ReactElement } from "react";
import FadeBackground from "./FadeBackground";


type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactElement[] | ReactElement;
}

const ModalWindow = ({ isOpen, onClose, children }: Props): ReactElement => {

    const [isModalOpen, setModalOpen] = useState(isOpen);

    if (!isModalOpen) {
        return <div></div>;
    }


    return (
        <FadeBackground>
            <div className="bg-light rounded p-5">
                {children}
                <hr />
                <button className="btn btn-secondary" onClick={() => {
                    setModalOpen(false);
                    onClose();
                }}>Close Window</button>
            </div>
        </FadeBackground>
    );
}


export default ModalWindow;