import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { getCompanyEditPath, getCompanyInvitesPath, getCompanyMembersPath, getCompanyPath, getCompanyProfileAdminsPath, getCompanyQuizzPath, getCompanyRequestsPath } from "../../Utils/router";

export type PropsType = {
    isOwner: boolean;
    companyId: string;
}


const CompanyProfileTabSwitch = ({isOwner, companyId}: PropsType): ReactElement => {
    return(
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <NavLink end to={getCompanyPath(companyId)} className={"nav-link "}>Company Info</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={getCompanyMembersPath(companyId)} className={"nav-link"}>Members</NavLink>
                </li>
               {
                isOwner &&
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
                <li className="nav-item">
                    <NavLink to={getCompanyQuizzPath(companyId)} className={"nav-link"}>Quizzes</NavLink>
                </li>
            </ul>
        

    )
}

export default CompanyProfileTabSwitch;