import { ReactElement } from "react";
import { Link } from "react-router-dom";

type PropsType = {
    openedTab: 'info' | 'members' | 'edit' | 'invites' | 'requests';
    isOwner: boolean;
    companyId: string;
}


const CompanyProfileTabSwitch = ({openedTab, isOwner, companyId}: PropsType): ReactElement => {
    return(
            <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                    <Link to={'/companies/' + companyId} className={"nav-link" + (openedTab == 'info' ? ' active' : '')}>Company Info</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/companies/' + companyId + '/members'} className={"nav-link" + (openedTab == 'members' ? ' active' : '')}>Members</Link>
                </li>
               {
                isOwner &&
                <>
                <li className="nav-item">
                    <Link to={'/companies/' + companyId + '/edit'} className={"nav-link" + (openedTab == 'edit' ? ' active' : '')}>Edit</Link>
                </li>
                 <li className="nav-item">
                    <Link to={'/companies/' + companyId + '/invites'} className={"nav-link" + (openedTab == 'invites' ? ' active' : '')}>Invites</Link>
                </li>
                  <li className="nav-item">
                    <Link to={'/companies/' + companyId + '/requests'} className={"nav-link" + (openedTab == 'requests' ? ' active' : '')}>Requests</Link>
                </li>
              </>
               } 
            </ul>
        

    )
}

export default CompanyProfileTabSwitch;