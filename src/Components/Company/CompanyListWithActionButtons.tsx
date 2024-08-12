import { Link } from "react-router-dom";
import Company from "../../Types/CompanyType";
import { getCompanyPath } from "../../Utils/router";
import Table from "../Table/Table";
import { ActionButton } from "../../Types/ActionButton";

const CompanyListWithActionButtons = ({companies, actions}: {companies: Company[], actions: ActionButton[]}) => {
    const companiesItems = companies.map((company) => ({
        id: company.id,
        items: [
            <Link to={getCompanyPath(company.id)}>{company.name}</Link>,
            company.owner.username,
             actions.map((action) => (
                <button className={`btn ${action.customClass}`} onClick={() => action.func(company.id)}>{action.text}</button>
            ))
        ]
    }));
    return (
        <Table 
            theadData={['Name', 'Owner', 'Actions']} tbodyData={companiesItems}
        />
    )
}

export default CompanyListWithActionButtons;