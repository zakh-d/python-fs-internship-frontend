import Company from "../Types/CompanyType";
import Table from "./Table/Table";

const CompanyList = ({companies}: {companies: Company[]}) => {
    const companiesItems = companies.map((company) => ({
        id: company.id,
        items: [
            company.name,
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