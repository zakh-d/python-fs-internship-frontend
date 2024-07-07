import CompanyList from "../Components/CompanyList/CompanyList";
import Header from "../Components/Header";
import Company from "../Types/CompanyType";

const AllCompanies = ({allCompanies}: {allCompanies: Company[]}) => {
    return (
        <div>
            <Header title="All Companies"/>

            <div className="container">
                <CompanyList companies={allCompanies}/>
            </div>
        </div>
    );
}

export default AllCompanies;