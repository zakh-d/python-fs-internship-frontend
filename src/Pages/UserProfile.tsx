import { useParams } from "react-router-dom";
import {withAuthentication} from "../Utils/hoc/auth_redirect";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectIsFetching, selectIsMe } from "../Store/selectors/user_profile_selectors";
import useAppDispatch from "../Store/hooks/dispatch";
import { getUser } from "../Store/thunks/users_thunk";

const UserProfile = () => {
    const {userId} = useParams();

    const dispatch = useAppDispatch();

    const user = useSelector(selectCurrentUser);
    const fetching = useSelector(selectIsFetching);
    const isMe = useSelector(selectIsMe);

    useEffect(() => {
        if (!userId || fetching) {
            return;
        }
        dispatch(getUser(userId));
    }, [userId]);

    if (fetching) {
        return <div className="container pt-4">
            <h3 className="text-center">Loading...</h3>
        </div>
    }

    if (!user) {
        return <div className="container pt-4">
            <h3 className="text-center">User not found</h3>
        </div>
    }

    return (
        <div className="container p-5">
            <img className="m-auto d-block" width={250} src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg" alt={user.first_name + "'s profile picture"}/>
            <h2 className="text-center">{user?.first_name} {user?.last_name}</h2>
            <p className="text-center text-muted">{user?.email}</p>
            {isMe && <p className="text-center">This is your profile</p>}
        </div>
    );
}

export default withAuthentication(UserProfile);