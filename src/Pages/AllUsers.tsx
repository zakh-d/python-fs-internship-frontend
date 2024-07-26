import { useSelector } from "react-redux";
import UserList from "../Components/UserList/UserList";
import useAppDispatch from "../Store/hooks/dispatch";
import {withAuthentication} from "../Utils/hoc/auth_redirect";
import { selectCurrentPage, selectIsFetching, selectUsers } from "../Store/selectors/user_list_selectors";
import { useEffect } from "react";
import { getUsers } from "../Store/thunks/users_thunk";
import Loader from "../Components/Loader";
import Pagination from "../Components/Pagination";


const AllUsers = () => {
    const dispatch = useAppDispatch();
    const fetching = useSelector(selectIsFetching);
    const users = useSelector(selectUsers);
    const currentPage = useSelector(selectCurrentPage);

    useEffect(() => {
       if (fetching) {
           return;
       }
       dispatch(getUsers(1));
    }, [currentPage]);

    return (
        <div className="container">
            {fetching ? 
                <Loader/> 
                :
                <UserList users={users}/>
            }
            <Pagination totalItems={1000} itemsPerPage={15} onPageChange={(page: number) => {
                dispatch(getUsers(page));
            }}/>
        </div>
    )
}

export default withAuthentication(AllUsers);
