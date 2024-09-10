import { useSelector } from "react-redux";
import { selectMe } from "../../Store/selectors/auth_selector";
import { ActionButton } from "../../Types/ActionButton";
import Company from "../../Types/CompanyType";
import { companyNameOwnerDataGetters } from "../../Utils/list_utils";
import TableWithActionButton from "../Table/TableWithActionButton";
import ModalWindow from "../ModalWindow";
import { useState } from "react";
import useAppDispatch from "../../Store/hooks/dispatch";
import { fetchLeaveCompany } from "../../Store/companyListSlice";

const CompaniesUserPartOf = ({ companies }: {companies: Company[]}) => {

    const currentUser = useSelector(selectMe);
    const dispatch = useAppDispatch();

    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [confirmModalAction, setConfirmModalAction] = useState<(() => void) | null>(null);
    
    const actions: ActionButton[] = [
        {
            text: 'Leave',
            customClass: 'btn-danger ms-1',
            func: (id: string) => {
                setConfirmModalAction(() => () => {
                    if (!currentUser) return;
                    dispatch(fetchLeaveCompany({companyId: id, userId: currentUser?.id}));
                });
                setConfirmModalOpen(true);
            }
        }
    ]

    const actionDisabled = [
        {
            key: (item: Company) => currentUser?.id === item.owner.id,
            actionIndex: 0
        }
    ]
    return (
        <>
            <TableWithActionButton<Company> items={companies} actions={actions} actionsDisabled={actionDisabled} dataGetters={companyNameOwnerDataGetters} />
            <ModalWindow isOpen={confirmModalOpen} onClose={ () => {
                setConfirmModalOpen(false);
                setConfirmModalAction(null);
            }} title="Do you wanna leave company?">
                <div className="d-flex w-100">
                    <button className="btn btn-danger" onClick={() => {
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
        </>
    );
}

export default CompaniesUserPartOf;