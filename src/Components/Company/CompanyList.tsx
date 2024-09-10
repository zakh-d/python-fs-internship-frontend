import { Link } from "react-router-dom";
import Company from "../../Types/CompanyType";
import { getCompanyPath } from "../../Utils/router";
import Table from "../Table/Table";

const CompanyList = ({companies}: {companies: Company[]}) => {
    const companiesItems = companies.map((company) => ({
        id: company.id,
        items: [
            <Link to={getCompanyPath(company.id)}>{company.name}</Link>,
            company.owner.username,
            company.owner.email
        ]
    }));
    return (
        <Table 
            theadData={['Name', 'Owner', 'Owner\'s email']} tbodyData={companiesItems}
        />
    )
}

export default CompanyList;