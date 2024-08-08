import { ReactElement } from "react";
import ComapnyForm from "./CompanyForm";
import useAppDispatch from "../../Store/hooks/dispatch";
import { fetchCompanyDelete, fetchCompanyUpdate } from "../../Store/companyProfileSlice";
import { CompanyDetail } from "../../Types/CompanyType";


const CompanyEditDelete = ({company}: {company: CompanyDetail}): ReactElement => {
    const dispatch = useAppDispatch();
    return (
        <div className="col-lg-4 col-md-8">
            <ComapnyForm formFunction={(values) => {
                dispatch(fetchCompanyUpdate({id: company.id, values}))
            }} initialValues={{...company}}/>

            <div className="alert alert-danger mt-4">
                <h3>Delete company</h3>
                <p>After you delete company, all data will be lost. This action cannot be undone.</p>
                <button className="btn btn-danger" onClick={() => {
                    if (window.confirm('Are you sure you want to delete this company?')) {
                        dispatch(fetchCompanyDelete(company.id));
                    }
                }}>Delete</button>
            </div>
        </div>
    )
}

export default CompanyEditDelete;