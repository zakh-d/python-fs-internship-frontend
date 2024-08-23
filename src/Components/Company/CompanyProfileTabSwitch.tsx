import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { getCompanyEditPath, getCompanyInvitesPath, getCompanyMembersPath, getCompanyPath, getCompanyProfileAdminsPath, getCompanyQuizzPath, getCompanyRequestsPath } from "../../Utils/router";
import { useSelector } from "react-redux";
import { selectRole } from "../../Store/selectors/company_selector";

export type PropsType = {
    companyId: string;
}


const CompanyProfileTabSwitch = ({companyId}: PropsType): ReactElement => {
    const role = useSelector(selectRole);
    return(
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <NavLink end to={getCompanyPath(companyId)} className={"nav-link "}>Company Info</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={getCompanyMembersPath(companyId)} className={"nav-link"}>Members</NavLink>
                </li>
               {
                role === 'owner' &&
                <>
                <li className="nav-item">
                    <NavLink to={getCompanyProfileAdminsPath(companyId)} className={"nav-link"}>Admins</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={getCompanyEditPath(companyId)} className={"nav-link"}>Edit</NavLink>
                </li>
                 <li className="nav-item">
                    <NavLink to={getCompanyInvitesPath(companyId)} className={"nav-link"}>Invites</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={getCompanyRequestsPath(companyId)} className={"nav-link"}>Requests</NavLink>
                </li>
              </>
               }
               {
                role !== 'none' &&
                <li className="nav-item">
                    <NavLink to={getCompanyQuizzPath(companyId)} className={"nav-link"}>Quizzes</NavLink>
                </li>
                }
            </ul>
        

    )
}

export default CompanyProfileTabSwitch;