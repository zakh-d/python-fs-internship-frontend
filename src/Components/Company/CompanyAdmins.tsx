import { useEffect } from "react";
import CompanyType from "../../Types/CompanyType";
import useAppDispatch from "../../Store/hooks/dispatch";
import { fetchAdmins, fetchRemoveAdmin } from "../../Store/companyProfileSlice";
import { useSelector } from "react-redux";
import { selectCompanyAdmins } from "../../Store/selectors/company_selector";
import UserListWithActionButton from "../User/UserListWIthActionButton";
import { ActionButton } from "../../Types/ActionButton";
import User from "../../Types/UserType";
import { usernameEmailDataGetters } from "../../Utils/userList";

const CompanyAdmins = ({company}: {company: CompanyType}) => {
    const dispatch = useAppDispatch();
    const admins = useSelector(selectCompanyAdmins);

    useEffect(() => {
        if (!company.id) return;
        dispatch(fetchAdmins(company.id));    
    }, [company.id]);
    
    const actions: ActionButton[] = [
        {
            func: function (id: string): void {
                dispatch(fetchRemoveAdmin({companyId: company.id, userId: id}));
            },
            text: "Remove",
            customClass: "btn-danger"
        }
    ]

    return (
        <>
            <h2>Admins</h2>
            <UserListWithActionButton<User> users={admins} actions={actions} dataGetters={usernameEmailDataGetters}/>
        </>
    )
}

export default CompanyAdmins;