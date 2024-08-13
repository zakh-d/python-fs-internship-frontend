import { ReactElement, useEffect, useState } from "react"
import UserList from "../User/UserList"
import { CompanyDetail } from "../../Types/CompanyType"
import { useSelector } from "react-redux"
import { selectCompanyMembers } from "../../Store/selectors/company_selector"
import useAppDispatch from "../../Store/hooks/dispatch"
import { fetchAddAdmin, fetchCompanyMembers, fetchRemoveMember } from "../../Store/companyProfileSlice"
import { selectMe } from "../../Store/selectors/auth_selector"
import UserListWithActionButton from "../User/UserListWIthActionButton"
import ModalWindow from "../ModalWindow"
import { ActionButton } from "../../Types/ActionButton"

const CompanyMembers = ({company}: {company: CompanyDetail}): ReactElement => {
    
    const dispatch = useAppDispatch();
    const members = useSelector(selectCompanyMembers);
    const me = useSelector(selectMe);
    const [confirmModalShown, setConfirmModalShown] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);


    useEffect(() => {
        dispatch(fetchCompanyMembers(company.id));
    }, [company.id]);

    if (company.owner.id !== me?.id) {
        return (
            <UserList users={members}/>
        )
    }

    const actions: ActionButton[] = [
        {
            func: function (id: string): void {
                dispatch(fetchAddAdmin({companyId: company.id, userId: id}));
            },
            text: "Assign as Admin",
            customClass: "btn-primary me-1"
        },
        {
            text: 'Remove',
            func: (userId: string) => {
                setConfirmModalShown(true);
                setSelectedUserId(userId);
            },
            customClass: 'btn-danger'
        }
    ]

    return ( 
        <>
            <UserListWithActionButton users={members} actions={actions}/>

        <ModalWindow isOpen={confirmModalShown} onClose={() => {
                setConfirmModalShown(false);
                setSelectedUserId(null);
            }} title="Remove Member?">
                <button className="btn btn-lg btn-danger" onClick={() => {
                    if (!selectedUserId) return;
                    dispatch(fetchRemoveMember({companyId: company.id, userId: selectedUserId}));
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


export default CompanyMembers;