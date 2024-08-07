import { ReactElement } from "react";
import ComapnyForm from "./CompanyForm";
import useAppDispatch from "../../Store/hooks/dispatch";
import { fetchCompanyUpdate } from "../../Store/companyProfileSlice";
import Company from "../../Types/CompanyType";


const CompanyEditDelete = ({company}: {company: Company}): ReactElement => {
    const dispatch = useAppDispatch();
    return (
        <>
            <ComapnyForm formFunction={(values) => {
                dispatch(fetchCompanyUpdate({id: company.id, values}))
            }} initialValues={{...company, hidden: false}}/>

            <div className="alert alert-danger mt-4 col-lg-4">
                <h3>Delete company</h3>
                <p>After you delete company, all data will be lost. This action cannot be undone.</p>
                <button className="btn btn-danger" onClick={() => {
                    if (window.confirm('Are you sure you want to delete this company?')) {

                    }
                }}>Delete</button>
            </div>
        </>
    )
}

export default CompanyEditDelete;