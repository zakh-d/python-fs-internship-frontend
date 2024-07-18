import { useLoaderData } from "react-router-dom";
import Company from "../Types/CompanyType";
import {withAuthentication} from "../Utils/hoc/auth_redirect";

const CompanyProfile = () => {
    const company: Company = useLoaderData() as Company;

    return (
        <div className="container">

            <h2 className="text-center">{company.name}</h2>
            <p className="text-center">{company.address}</p>
            <p className="text-center text-muted">{company.city} | {company.country}</p>
            <p className="text-center">Phone: {company.phone} <br /> Email: {company.email}</p>
        </div>
    );
}

export default withAuthentication(CompanyProfile);