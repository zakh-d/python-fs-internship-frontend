import { Navigate, useParams } from "react-router-dom";
import {withAuthentication} from "../Utils/hoc/auth_redirect";
import { useSelector } from "react-redux";
import { selectCompanyProfileLoading, selectCurrentCompany, selectIsOwnerOfCompany, selectRole } from "../Store/selectors/company_selector";
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
import CompanyQuizzes from "../Components/Company/CompanyQuizzes";
import QuizzForm from "../Components/Quizz/QuizzForm";
import { getCompanyPath } from "../Utils/router";
import AverageMembersScores from "../Components/Company/AverageMembersScores";
import QuizzUpload from "../Components/Quizz/QuizzUpload";

type TabProps = {
    openedTab: 'info' | 'members' | 'edit' | 'invites' | 'requests' | 'admins' | 'quizzes' | 'quizzAdd' | 'analytics' | 'quizz_upload';
}

const CompanyProfile = ({openedTab}: TabProps) => {

    const {companyId} = useParams();

    const dispatch = useAppDispatch();
    const company = useSelector(selectCurrentCompany);
    const loading = useSelector(selectCompanyProfileLoading);
    const isOwer = useSelector(selectIsOwnerOfCompany);
    const role = useSelector(selectRole);

    useEffect(() => {
        if (!companyId) return;
        if (company && company.id === companyId) return;
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
        return <Navigate to={getCompanyPath(company.id)}/>
    }

    if (openedTab === 'quizzes' && role === 'none') {
        return <Navigate to={getCompanyPath(company.id)}/>
    }

    if (['quizzAdd', 'analytics', 'quizz_upload'].indexOf(openedTab) > -1 && (role === 'none' || role === 'member')) {
        return <Navigate to={getCompanyPath(company.id)}/>
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
            break;
        case 'quizzes':
            displayedTab = <CompanyQuizzes company={company}/>
            break;
        case 'quizzAdd':
            displayedTab = <QuizzForm company={company}/>
            break;
        case 'analytics':
            displayedTab = <AverageMembersScores company={company}/>
            break
        case 'quizz_upload':
            displayedTab = <QuizzUpload company={company}/>
            break;
    }

    return (
        <div className="container">
            <CompanyProfileTabSwitch companyId={company.id}/>
            {displayedTab}
       </div>
    );
}

export default withAuthentication<TabProps & {key?: Key}>(CompanyProfile);