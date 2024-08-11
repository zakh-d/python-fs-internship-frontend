import { ReactElement, useEffect, useState } from "react"
import { CompanyDetail } from "../../Types/CompanyType"
import { useSelector } from "react-redux"
import { selectCompanyInvites } from "../../Store/selectors/company_selector"
import useAppDispatch from "../../Store/hooks/dispatch"
import { fetchCancelUserInvite, fetchCompanyInvites } from "../../Store/companyProfileSlice"
import UserListWithActionButton from "../UserListWIthActionButton"
import ModalWindow from "../ModalWindow"

const CompanyInvites = ({company}: {company: CompanyDetail}): ReactElement => {
    
    const dispatch = useAppDispatch();
    const invites = useSelector(selectCompanyInvites);
    const [confirmModalShown, setConfirmModalShown] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchCompanyInvites(company.id));
    }, [company.id]);

    const actions = [
        {
            func: (userId: string) => {
                setConfirmModalShown(true);
                setSelectedUserId(userId);
            },
            text: "Cancel",
            customClass: "btn-danger"
        }
    ]

    return (
        <>
        <UserListWithActionButton users={invites} actions={actions}/>

        <ModalWindow isOpen={confirmModalShown} onClose={() => {
                setConfirmModalShown(false);
                setSelectedUserId(null);
            }} title="Cancel Invite?">
                <button className="btn btn-lg btn-danger" onClick={() => {
                    if (!selectedUserId) return;
                    dispatch(fetchCancelUserInvite({companyId: company.id, userId: selectedUserId}));
                    setConfirmModalShown(false);
                    setSelectedUserId(null);
                }}>Yes</button>
                <button className="btn btn-lg btn-primary" onClick={() => {
                    setConfirmModalShown(false);
                    setSelectedUserId(null);
                }}>No</button>
            </ModalWindow>
        </>
    )
}


export default CompanyInvites;