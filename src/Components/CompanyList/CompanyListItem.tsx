import { Link } from "react-router-dom";
import Company from "../../Types/CompanyType";

const CompanyListItem = ({ company }: {company: Company}) => {
    return (
        <tr>
            <td><Link to={`/companies/${company.id}`}>{company.name}</Link></td>
            <td>{company.country}</td>
            <td>{company.email}</td>
        </tr>
    );
}

export default CompanyListItem;