import { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectQuizzList, selectQuizzTotalCount } from "../../Store/selectors/quizzSelector";
import useAppDispatch from "../../Store/hooks/dispatch";
import Company from "../../Types/CompanyType";
import { fetchCompanyQuizzes } from "../../Store/quizzSlice";
import QuizzCardList from "../Quizz/QuizzCardList";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";
import { getCompanyQuizzAddPath, getQuizzUploadPath } from "../../Utils/router";
import { selectRole } from "../../Store/selectors/company_selector";

const CompanyQuizzes = ({company}: {company: Company}): ReactElement => {
    const dispatch = useAppDispatch();
    const quizzes = useSelector(selectQuizzList);
    const role = useSelector(selectRole);
    const totalCount = useSelector(selectQuizzTotalCount);

    useEffect(() => {
        dispatch(fetchCompanyQuizzes({companyId: company.id, page: 1, itemsPerPage: 5}));
    }, [company.id]);

    return (
    <div>
        {
            (role === 'owner' || role == 'admin') &&
            <>
                <Link className="btn btn-primary" to={getCompanyQuizzAddPath(company.id)}>Add Quizz</Link>
                <Link className="btn btn-success ms-1" to={getQuizzUploadPath(company.id)}>Upload</Link>
            </>

        }
        <br /><br />
        <QuizzCardList company={company} quizzes={quizzes}/>
        <br />
        <Pagination totalItems={totalCount} itemsPerPage={5} onPageChange={function (page: number, itemsPerPage: number): void {
            dispatch(fetchCompanyQuizzes({companyId: company.id, page: page, itemsPerPage: itemsPerPage}));
        }}/>
    </div>
    )
}

export default CompanyQuizzes;