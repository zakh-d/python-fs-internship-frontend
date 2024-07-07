import CompanyList from "../Components/CompanyList/CompanyList";

import Company from "../Types/CompanyType";

const AllCompanies = ({allCompanies}: {allCompanies: Company[]}) => {
    return (
        <div className="container">
            <CompanyList companies={allCompanies}/>
        </div>
    );
}

export default AllCompanies;