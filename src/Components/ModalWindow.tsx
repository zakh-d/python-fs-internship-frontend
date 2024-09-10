import { useEffect, useState } from "react";
import { ReactElement } from "react";
import FadeBackground from "./FadeBackground";


type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactElement[] | ReactElement;
    title?: string;
}

const ModalWindow = ({ isOpen, onClose, children, title }: Props): ReactElement => {

    const [isModalOpen, setModalOpen] = useState(isOpen);

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    if (!isModalOpen) {
        return <></>;
    }

    return (
        <FadeBackground>
            <div className="modal-dialog" role="document">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">{title || ''}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            onClick={() => {
                                setModalOpen(false);
                                onClose();
                            }}    
                        ></button>
                    </div>
                    <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
                        {children}
                    </div>
                </div>
            </div>
        </FadeBackground>
    );
}


export default ModalWindow;