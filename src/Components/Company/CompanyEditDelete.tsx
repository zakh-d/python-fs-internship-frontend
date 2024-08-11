import { ReactElement, useState } from "react";
import ComapnyForm from "./CompanyForm";
import useAppDispatch from "../../Store/hooks/dispatch";
import { fetchCompanyDelete, fetchCompanyUpdate } from "../../Store/companyProfileSlice";
import { CompanyDetail } from "../../Types/CompanyType";
import ModalWindow from "../ModalWindow";


const CompanyEditDelete = ({company}: {company: CompanyDetail}): ReactElement => {
    const dispatch = useAppDispatch();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    return (
        <div className="col-lg-4 col-md-8">
            <ComapnyForm formFunction={(values) => {
                dispatch(fetchCompanyUpdate({id: company.id, values}))
            }} initialValues={{...company}}/>

            <div className="alert alert-danger mt-4">
                <h3>Delete company</h3>
                <p>After you delete company, all data will be lost. This action cannot be undone.</p>
                <button className="btn btn-danger" onClick={() => {
                    setDeleteModalOpen(true);
                }}>Delete</button>
            </div>
            <ModalWindow isOpen={deleteModalOpen} onClose={() => {
                setDeleteModalOpen(false);
            }} title="Confirm you want to delete">
                <button onClick={
                    () => {
                        dispatch(fetchCompanyDelete(company.id));
                }} className="btn btn-lg btn-danger">Delete</button>
                <button type="button" className="btn btn-lg btn-secondary" onClick={() => {setDeleteModalOpen(false)}}>Cancel</button>
            </ModalWindow>
        </div>
    )
}

export default CompanyEditDelete;