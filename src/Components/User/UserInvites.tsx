import { useSelector } from "react-redux";
import { selectUserInvites } from "../../Store/selectors/company_action_user_selector";
import CompanyListWithActionButtons from "../Company/CompanyListWithActionButtons";
import { ActionButton } from "../../Types/ActionButton";
import { useEffect, useState } from "react";
import useAppDispatch from "../../Store/hooks/dispatch";
import { fetchAcceptInvite, fetchDeclineInvite, fetchUserInvites } from "../../Store/companyActionUserSlice";
import ModalWindow from "../ModalWindow";

const UserInvites = () => {
    const invites = useSelector(selectUserInvites);
    const dispatch = useAppDispatch();

    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [confirmModalAction, setConfirmModalAction] = useState<(() => void) | null>(null);

    useEffect(() => {
        dispatch((fetchUserInvites()));
    }, []);

    const actions: ActionButton[] = [
        {
            text: 'Accept',
            customClass: 'btn-primary',
            func: (id: string) => {
                setConfirmModalOpen(true);
                setConfirmModalAction(() => () => {
                    dispatch(fetchAcceptInvite(id));
                })
            }
        },
        {
            text: 'Reject',
            customClass: 'btn-danger ms-1',
            func: (id: string) => {
                setConfirmModalOpen(true);
                setConfirmModalAction(() => () => {
                    dispatch(fetchDeclineInvite(id));
                })
            }
        }
    ]

    if (invites.length === 0) {
        return <div className="container">
            <h3 className="text-center">You don't have any pending invites</h3>
        </div>
    }

    return (
        <div className="container">
            <h3>Pending Invites</h3>
            <CompanyListWithActionButtons companies={invites} actions={actions} />
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

export default UserInvites;