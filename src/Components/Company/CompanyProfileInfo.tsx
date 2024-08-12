import { Link } from "react-router-dom";
import Company from "../../Types/CompanyType";
import { getUserProfilePath } from "../../Utils/router";

const ComapnyProfileInfo = ({company}: {company: Company}) => {
    return (
        <>
            <h1>{company.name}</h1>
            <p>{company.description}</p>

            <h4>Owner</h4>
            <p className="text-muted"><Link className="text-muted" to={getUserProfilePath(company.owner.id)}>{company.owner.username}</Link> | {company.owner.email}</p>
        </>
    );
}

export default ComapnyProfileInfo;