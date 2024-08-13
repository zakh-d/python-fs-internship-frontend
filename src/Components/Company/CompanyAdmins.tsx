import { useEffect } from "react";
import CompanyType from "../../Types/CompanyType";
import useAppDispatch from "../../Store/hooks/dispatch";
import { fetchAdmins, fetchRemoveAdmin } from "../../Store/companyProfileSlice";
import { useSelector } from "react-redux";
import { selectCompanyAdmins } from "../../Store/selectors/company_selector";
import UserListWithActionButton from "../User/UserListWIthActionButton";
import { ActionButton } from "../../Types/ActionButton";

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
            <UserListWithActionButton users={admins} actions={actions}/>
            <button className="btn btn-primary">Add</button>
        </>
    )
}

export default CompanyAdmins;