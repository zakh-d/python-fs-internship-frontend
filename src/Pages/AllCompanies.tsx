import CompanyList from "../Components/CompanyList/CompanyList";

import Company from "../Types/CompanyType";
import {withAuthentication} from "../Utils/hoc/auth_redirect";

interface PropsType extends JSX.IntrinsicAttributes {
    allCompanies: Company[],
}

const AllCompanies = ({allCompanies}: PropsType) => {
    return (
        <div className="container">
            <CompanyList companies={allCompanies}/>
        </div>
    );
}

export default withAuthentication(AllCompanies);