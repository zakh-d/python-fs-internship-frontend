import { ReactElement, useEffect, useState } from "react"
import { CompanyDetail } from "../../Types/CompanyType"
import { useSelector } from "react-redux"
import { selectCompanyInvites } from "../../Store/selectors/company_selector"
import useAppDispatch from "../../Store/hooks/dispatch"
import { fetchCancelUserInvite, fetchCompanyInvites, fetchInviteUser } from "../../Store/companyProfileSlice"
import UserListWithActionButton from "../UserListWIthActionButton"
import ModalWindow from "../ModalWindow"
import {Form as FinalForm} from 'react-final-form'
import Input from "../Input"
import { validateEmail } from "../../Utils/validate_email"

const CompanyInvites = ({company}: {company: CompanyDetail}): ReactElement => {
    
    const dispatch = useAppDispatch();
    const invites = useSelector(selectCompanyInvites);
    const [confirmModalShown, setConfirmModalShown] = useState(false);
    const [iviteUserModalShown, setInviteUserModalShown] = useState(false);
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
        <button className="btn btn-primary" onClick={() => setInviteUserModalShown(true)}>Invite User</button>

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

            <ModalWindow isOpen={iviteUserModalShown} onClose={() => {
                setInviteUserModalShown(false);
            }} title="Invite User">
                <FinalForm 
                validate={({email}) => {
                    const errors: {email?: string} = {};
                    if (!email) {
                        errors.email = "Required";
                    } else if (!validateEmail(email)) {
                        errors.email = "Invalid email";
                    }
                    return errors;
                }}
                onSubmit={({email}) => {
                    if (!email) return;
                    dispatch(fetchInviteUser({
                        companyId:company.id,
                        userEmail: email
                    }));
                    setInviteUserModalShown(false);
                }}
                render={({handleSubmit}) => (
                    <form className="d-flex flex-column" onSubmit={handleSubmit}>
                        <Input labelText={"Email"} name={"email"} type={"text"}/>
                        <button type="submit" className="btn btn-primary">Invite</button>
                    </form>
                )}/>
               
            </ModalWindow>
        </>
    )
}


export default CompanyInvites;