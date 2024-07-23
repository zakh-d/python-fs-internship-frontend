import { useSelector } from "react-redux";
import UserList from "../Components/UserList/UserList";
import useAppDispatch from "../Store/hooks/dispatch";
import {withAuthentication} from "../Utils/hoc/auth_redirect";
import { selectCurrentPage, selectIsFetching, selectUsers } from "../Store/selectors/user_list_selectors";
import { useEffect } from "react";
import { getUsers } from "../Store/thunks/users_thunk";
import Loader from "../Components/Loader";


const AllUsers = () => {
    const dispatch = useAppDispatch();
    const fetching = useSelector(selectIsFetching);
    const users = useSelector(selectUsers);
    const currentPage = useSelector(selectCurrentPage);

    useEffect(() => {
       if (fetching) {
           return;
       }
       dispatch(getUsers());
    }, [currentPage]);

    if (fetching) {
        return <Loader/>;
    }

    return (
        <div className="container">

            <UserList users={users}/>
        </div>
    )
}

export default withAuthentication(AllUsers);
