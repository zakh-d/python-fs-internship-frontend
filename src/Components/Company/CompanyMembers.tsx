import { ReactElement, useEffect, useState } from "react"
import UserList from "../User/UserList"
import { CompanyDetail } from "../../Types/CompanyType"
import { useSelector } from "react-redux"
import { selectCompanyMembers } from "../../Store/selectors/company_selector"
import useAppDispatch from "../../Store/hooks/dispatch"
import { fetchAddAdmin, fetchCompanyMembers, fetchRemoveMember } from "../../Store/companyProfileSlice"
import { selectMe } from "../../Store/selectors/auth_selector"
import TableWithActionButton from "../Table/TableWithActionButton"
import ModalWindow from "../ModalWindow"
import { ActionButton } from "../../Types/ActionButton"
import {UserInCompany} from "../../Types/UserType"
import { usernameEmailDataGetters } from "../../Utils/list_utils"

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
            text: 'Remove Member',
            func: (userId: string) => {
                setConfirmModalShown(true);
                setSelectedUserId(userId);
            },
            customClass: 'btn-danger'
        }
    ]

    const actionsDisabled = [
        {
            key: (item: UserInCompany) => item.role === 'owner',
            actionIndex: 0
        },
        {
            key: (item: UserInCompany) => item.role === 'owner',
            actionIndex: 1
        },
        {
            key: (item: UserInCompany) => item.role === 'admin',
            actionIndex: 0
        }
    ]

    return ( 
        <>
            <TableWithActionButton<UserInCompany> items={members} dataGetters={usernameEmailDataGetters} actions={actions} actionsDisabled={actionsDisabled}/>

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