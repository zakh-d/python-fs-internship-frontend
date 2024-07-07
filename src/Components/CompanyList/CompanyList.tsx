import Company from "../../Types/CompanyType";
import CompanyListItem from "./CompanyListItem";

const CompanyList = ({companies}: {companies: Company[]}) => {
    const companiesItems = companies.map((company) => {
        return <CompanyListItem company={company}/>
    });
    return (
        <table className="table">
            <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Email</th>
            </tr>
            {companiesItems}
        </table>
    )
}

export default CompanyList;