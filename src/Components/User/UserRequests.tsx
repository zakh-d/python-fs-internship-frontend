import { useSelector } from "react-redux";
import { selectUserRequests } from "../../Store/selectors/company_action_user_selector";
import CompanyListWithActionButtons from "../Company/CompanyListWithActionButtons";
import { ActionButton } from "../../Types/ActionButton";
import { useEffect, useState } from "react";
import useAppDispatch from "../../Store/hooks/dispatch";
import { fetchUserRequests, fetchCancelRequest } from "../../Store/companyActionUserSlice";
import ModalWindow from "../ModalWindow";

const UserRequests = () => {
    const requests = useSelector(selectUserRequests);
    const dispatch = useAppDispatch();

    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [confirmModalAction, setConfirmModalAction] = useState<(() => void) | null>(null);

    useEffect(() => {
        dispatch((fetchUserRequests()));
    }, []);

    const actions: ActionButton[] = [
        {
            text: 'Cancel',
            customClass: 'btn-danger ms-1',
            func: (id: string) => {
                setConfirmModalOpen(true);
                setConfirmModalAction(() => () => {
                    dispatch(fetchCancelRequest(id));
                })
            }
        }
    ]

    if (requests.length === 0) {
        return <div className="container">
            <h3 className="text-center">You don't have any pending requests</h3>
        </div>
    }

    return (
        <div className="container">
            <h3>Pending requests</h3>
            <CompanyListWithActionButtons companies={requests} actions={actions} />
            <ModalWindow isOpen={confirmModalOpen} onClose={() =>  {
                setConfirmModalOpen(false);
                setConfirmModalAction(null);
            } } title="Confirm">
                <div className="d-flex w-100">
                    <button className="btn btn-primary" onClick={() => {
                        if (confirmModalAction) {
                            confirmModalAction();
                        }
                        setConfirmModalOpen(false);
                        setConfirmModalAction(null);
                    }}>Yes</button>
                    <button className="btn btn-secondary ms-2" onClick={() => {
                        setConfirmModalOpen(false);
                        setConfirmModalAction(null);
                    }}>No</button>
                </div>
            </ModalWindow>
        </div>
    );
}

export default UserRequests;