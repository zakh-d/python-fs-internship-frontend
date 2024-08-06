import Company from "../../Types/CompanyType";
import CompanyListItem from "./CompanyListItem";

const CompanyList = ({companies}: {companies: Company[]}) => {
    const companiesItems = companies.map((company) => {
        return <CompanyListItem company={company}/>
    });
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Owner</th>
                    <th>Owner's email</th>
                </tr>
            </thead>
            <tbody>
                {companiesItems}
            </tbody>
        </table>
    )
}

export default CompanyList;