import { useState } from "react";
import { ReactElement } from "react";
import styled from "styled-components";


const FadeBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactElement[];
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