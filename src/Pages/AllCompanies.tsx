import { useEffect } from "react";
import CompanyList from "../Components/CompanyList/CompanyList";
import useAppDispatch from "../Store/hooks/dispatch";


import {withAuthentication} from "../Utils/hoc/auth_redirect";
import { fetchComapnies } from "../Store/companyListSlice";
import { useSelector } from "react-redux";
import { selectComanyListLoading, selectCompanies, selectTotalCompanies } from "../Store/selectors/company_selector";
import Loader from "../Components/Loader";
import Pagination from "../Components/Pagination";
import { Link } from "react-router-dom";

interface PropsType extends JSX.IntrinsicAttributes {
    showingAllCompanies: boolean;
}

const AllCompanies = ({showingAllCompanies}: PropsType) => {
    const dispatch = useAppDispatch();
    const companies = useSelector(selectCompanies);
    const loading = useSelector(selectComanyListLoading);
    const totalCount = useSelector(selectTotalCompanies);

    // const [showingAllCompanies, setShowingAllCompanies] = useState(true);

    useEffect(() => {
        dispatch(fetchComapnies({page: 1, limit: 10}));
    }, []);

    return (
        <div className="container">
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
        </div>
    );
}

export default withAuthentication(AllCompanies);