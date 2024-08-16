import { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectQuizzList, selectQuizzTotalCount } from "../../Store/selectors/quizzSelector";
import useAppDispatch from "../../Store/hooks/dispatch";
import Company from "../../Types/CompanyType";
import { getCompanyQuizzes } from "../../Store/quizzSlice";
import QuizzCardList from "../Quizz/QuizzCardList";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";
import { getCompanyQuizzAddPath } from "../../Utils/router";

const CompanyQuizzes = ({company}: {company: Company}): ReactElement => {
    const dispatch = useAppDispatch();
    const quizzes = useSelector(selectQuizzList);
    const totalCount = useSelector(selectQuizzTotalCount);

    useEffect(() => {
        dispatch(getCompanyQuizzes({companyId: company.id, page: 1, itemsPerPage: 5}));
    }, [company.id]);

    return (
    <div>
        <Link className="btn btn-primary" to={getCompanyQuizzAddPath(company.id)}>Add Quizz</Link>
        <br /><br />
        <QuizzCardList quizzes={quizzes}/>
        <br />
        <Pagination totalItems={totalCount} itemsPerPage={5} onPageChange={function (page: number, itemsPerPage: number): void {
            dispatch(getCompanyQuizzes({companyId: company.id, page: page, itemsPerPage: itemsPerPage}));
        }}/>
    </div>
    )
}

export default CompanyQuizzes;