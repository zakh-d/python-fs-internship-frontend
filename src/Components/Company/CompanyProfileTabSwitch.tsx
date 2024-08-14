import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { getCompanyEditPath, getCompanyInvitesPath, getCompanyMembersPath, getCompanyPath, getCompanyProfileAdminsPath, getCompanyRequestsPath } from "../../Utils/router";

export type PropsType = {
    openedTab: 'info' | 'members' | 'edit' | 'invites' | 'requests' | 'admins';
    isOwner: boolean;
    companyId: string;
}


const CompanyProfileTabSwitch = ({openedTab, isOwner, companyId}: PropsType): ReactElement => {
    return(
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <Link to={getCompanyPath(companyId)} className={"nav-link" + (openedTab == 'info' ? ' active' : '')}>Company Info</Link>
                </li>
                <li className="nav-item">
                    <Link to={getCompanyMembersPath(companyId)} className={"nav-link" + (openedTab == 'members' ? ' active' : '')}>Members</Link>
                </li>
               {
                isOwner &&
                <>
                <li className="nav-item">
                    <Link to={getCompanyProfileAdminsPath(companyId)} className={"nav-link" + (openedTab == 'admins' ? ' active' : '')}>Admins</Link>
                </li>
                <li className="nav-item">
                    <Link to={getCompanyEditPath(companyId)} className={"nav-link" + (openedTab == 'edit' ? ' active' : '')}>Edit</Link>
                </li>
                 <li className="nav-item">
                    <Link to={getCompanyInvitesPath(companyId)} className={"nav-link" + (openedTab == 'invites' ? ' active' : '')}>Invites</Link>
                </li>
                  <li className="nav-item">
                    <Link to={getCompanyRequestsPath(companyId)} className={"nav-link" + (openedTab == 'requests' ? ' active' : '')}>Requests</Link>
                </li>
              </>
               } 
            </ul>
        

    )
}

export default CompanyProfileTabSwitch;