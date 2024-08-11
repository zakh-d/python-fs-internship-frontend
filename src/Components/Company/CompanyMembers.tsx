import { ReactElement, useEffect } from "react"
import UserList from "../UserList"
import { CompanyDetail } from "../../Types/CompanyType"
import { useSelector } from "react-redux"
import { selectCompanyMembers } from "../../Store/selectors/company_selector"
import useAppDispatch from "../../Store/hooks/dispatch"
import { fetchCompanyMembers } from "../../Store/companyProfileSlice"

const CompanyMembers = ({company}: {company: CompanyDetail}): ReactElement => {
    
    const dispatch = useAppDispatch();
    const members = useSelector(selectCompanyMembers);

    useEffect(() => {
        dispatch(fetchCompanyMembers(company.id));
    }, [company.id]);

    return (
        <UserList users={members}/>
    )
}


export default CompanyMembers;