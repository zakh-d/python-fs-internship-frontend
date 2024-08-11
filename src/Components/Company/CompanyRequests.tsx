import { ReactElement, useEffect } from "react"
import UserList from "../UserList"
import { CompanyDetail } from "../../Types/CompanyType"
import { useSelector } from "react-redux"
import { selectCompanyRequests } from "../../Store/selectors/company_selector"
import useAppDispatch from "../../Store/hooks/dispatch"
import { fetchCompanyRequests } from "../../Store/companyProfileSlice"

const CompanyMembers = ({company}: {company: CompanyDetail}): ReactElement => {
    
    const dispatch = useAppDispatch();
    const requests = useSelector(selectCompanyRequests);

    useEffect(() => {
        dispatch(fetchCompanyRequests(company.id));
    }, [company.id]);

    return (
        <UserList users={requests}/>
    )
}


export default CompanyMembers;