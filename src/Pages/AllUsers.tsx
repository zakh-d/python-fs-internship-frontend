import { useSelector } from "react-redux";
import UserList from "../Components/UserList";
import useAppDispatch from "../Store/hooks/dispatch";
import {withAuthentication} from "../Utils/hoc/auth_redirect";
import { selectIsFetching, selectTotalCount, selectUsers } from "../Store/selectors/user_list_selectors";
import { useEffect } from "react";
import { getUsers } from "../Store/thunks/users_thunk";
import Loader from "../Components/Loader";
import Pagination from "../Components/Pagination";


const AllUsers = () => {
    const dispatch = useAppDispatch();
    const fetching = useSelector(selectIsFetching);
    const users = useSelector(selectUsers);
    const totalCount = useSelector(selectTotalCount);

    useEffect(() => {
       if (fetching) {
           return;
       }
       dispatch(getUsers(1, 5));
    }, []);

    return (
        <div className="container">
            {fetching ? 
                <Loader/> 
                :
                <UserList users={users}/>
            }
            <Pagination totalItems={totalCount} itemsPerPage={5} onPageChange={(page: number, itemsPerPage: number) => {
                dispatch(getUsers(page, itemsPerPage));
            }}/>
        </div>
    )
}

export default withAuthentication(AllUsers);
