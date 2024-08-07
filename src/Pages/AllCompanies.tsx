import { useEffect, useState } from "react";
import CompanyList from "../Components/CompanyList/CompanyList";
import useAppDispatch from "../Store/hooks/dispatch";


import {withAuthentication} from "../Utils/hoc/auth_redirect";
import { fetchComapnies, fetchCreateNewCompany } from "../Store/companyListSlice";
import { useSelector } from "react-redux";
import { selectComanyListLoading, selectCompanies, selectTotalCompanies } from "../Store/selectors/company_selector";
import Loader from "../Components/Loader";
import Pagination from "../Components/Pagination";
import { Link } from "react-router-dom";
import ModalWindow from "../Components/ModalWindow";
import CompanyForm from "../Components/Company/CompanyForm";
import styled from "styled-components";


const FixedBottomRightButton = styled.button`
width: 70px;
height: 70px;
border-radius: 50%;
position: fixed;
font-size: 30px;
bottom: 20px;
right: 20px;
`

interface PropsType extends JSX.IntrinsicAttributes {
    showingAllCompanies: boolean;
}

const AllCompanies = ({showingAllCompanies}: PropsType) => {
    const dispatch = useAppDispatch();
    const companies = useSelector(selectCompanies);
    const loading = useSelector(selectComanyListLoading);
    const totalCount = useSelector(selectTotalCompanies);

    const [createModalOpen, setCreateModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchComapnies({page: 1, limit: 10}));
    }, []);

    return (
        <div className="container">
            <FixedBottomRightButton onClick={() => setCreateModalOpen(true)} className="btn btn-lg btn-primary">+</FixedBottomRightButton>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link to={'/companies/'} className={"nav-link" + (showingAllCompanies ? " active" : "")}>All Companies</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/companies/my'} className={"nav-link" + (!showingAllCompanies ? " active" : "")}>My Companies</Link>
                </li>
                
            </ul>
            {
                loading ? 
                <Loader />
                :
                <CompanyList companies={companies}/>
            }
            <Pagination totalItems={totalCount} itemsPerPage={10} onPageChange={function (page: number, itemsPerPage: number): void {
                dispatch(fetchComapnies({page, limit: itemsPerPage}));
            } } />

            <ModalWindow isOpen={createModalOpen} onClose={function () {
                setCreateModalOpen(false);
            }}>
                <div>
                    <h3>Create new company</h3>
                    <hr />
                    <CompanyForm formFunction={(values: any) => {
                        dispatch(fetchCreateNewCompany(values));
                    } } submitText="Create"/>
                </div>
            </ModalWindow>
        </div>
    );
}

export default withAuthentication(AllCompanies);