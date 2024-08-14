import { Navigate, useParams } from "react-router-dom";
import {withAuthentication} from "../Utils/hoc/auth_redirect";
import { useSelector } from "react-redux";
import { selectCompanyProfileLoading, selectCurrentCompany, selectIsOwnerOfCompany } from "../Store/selectors/company_selector";
import { Key, useEffect } from "react";
import useAppDispatch from "../Store/hooks/dispatch";
import { fetchCompanyById } from "../Store/companyProfileSlice";
import Loader from "../Components/Loader";
import CompanyProfileTabSwitch from "../Components/Company/CompanyProfileTabSwitch";
import ComapnyProfileInfo from "../Components/Company/CompanyProfileInfo";
import CompanyEditDelete from "../Components/Company/CompanyEditDelete";
import CompanyInvites from "../Components/Company/CompanyInvites";
import CompanyMembers from "../Components/Company/CompanyMembers";
import CompanyRequests from "../Components/Company/CompanyRequests";
import CompanyAdmins from "../Components/Company/CompanyAdmins";

type TabProps = {
    openedTab: 'info' | 'members' | 'edit' | 'invites' | 'requests' | 'admins';
}

const CompanyProfile = ({openedTab}: TabProps) => {

    const {companyId} = useParams();

    const dispatch = useAppDispatch();
    const company = useSelector(selectCurrentCompany);
    const loading = useSelector(selectCompanyProfileLoading);
    const isOwer = useSelector(selectIsOwnerOfCompany);

    useEffect(() => {
        if (!companyId) return;
        dispatch(fetchCompanyById(companyId));
    }, [companyId])

    if (loading) {
        return <Loader/>
    }

    if (company === null) {
        return <div className="container">
            <h1>404</h1>
        </div>
    }

    if (['edit', 'invites', 'requests'].indexOf(openedTab) > -1 && !isOwer) {
        return <Navigate to={'/companies/' + companyId}/>
    }

    let displayedTab = <ComapnyProfileInfo company={company} />;

    switch (openedTab) {
        case 'members':
            displayedTab = <CompanyMembers company={company}/>
            break;
        case 'edit':
            displayedTab = <CompanyEditDelete company={company}/>
            break;
        case 'invites':
            displayedTab = <CompanyInvites company={company}/> 
            break;
        case 'requests':
            displayedTab = <CompanyRequests company={company}/>
            break;
        case 'admins':
            displayedTab = <CompanyAdmins company={company}/>
    }

    return (
        <div className="container">
            
            <CompanyProfileTabSwitch openedTab={openedTab} isOwner={isOwer} companyId={companyId || ''}/>
            {displayedTab}
       </div>
    );
}

export default withAuthentication<TabProps & {key?: Key}>(CompanyProfile);