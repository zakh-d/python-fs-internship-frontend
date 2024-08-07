import { Link } from "react-router-dom";
import Company from "../../Types/CompanyType";

const CompanyListItem = ({ company }: {company: Company}) => {
    return (
        <tr key={company.id}>
            <td><Link to={`/companies/${company.id}`}>{company.name}</Link></td>
            <td>{company.owner.username}</td>
            <td>{company.owner.email}</td>
        </tr>
    );
}

export default CompanyListItem;