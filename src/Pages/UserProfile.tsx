import { useParams } from "react-router-dom";
import {withAuthentication} from "../Utils/hoc/auth_redirect";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectDeleteFetching, selectIsFetching, selectIsMe } from "../Store/selectors/user_profile_selectors";
import useAppDispatch from "../Store/hooks/dispatch";
import { deleteUser, getUser } from "../Store/thunks/users_thunk";
import Loader from "../Components/Loader";
import UserUpdateForm from "../Components/UserUpdateForm";

const UserProfile = () => {
    const {userId} = useParams();

    const dispatch = useAppDispatch();

    const user = useSelector(selectCurrentUser);
    const fetching = useSelector(selectIsFetching);
    const deleteFetching = useSelector(selectDeleteFetching);
    const isMe = useSelector(selectIsMe);

    const [editing, setEditing] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    useEffect(() => {
        if (!userId || fetching) {
            return;
        }
        dispatch(getUser(userId));
    }, [userId]);

    if (fetching) {
        return <Loader/>;
    }

    if (!user) {
        return <div className="container pt-4">
            <h3 className="text-center">User not found</h3>
        </div>
    }

    if (editing) {
       return (
        <div className="container p-5">
            <img className="m-auto d-block" width={250} src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg" alt={user.first_name + "'s profile picture"}/>
            <UserUpdateForm user={user} onSubmitAdditionaly={() => setEditing(false)} onCancelAdditionaly={() => {
                setEditing(false);
                setDeleteConfirm(false);
            }}/>
            {isMe &&
                <> 
                <div className="row">
                    <div className="alert alert-danger col-lg-4 offset-lg-4 p-2 mt-4">
                        <h3>Danger Zone</h3>
                        <hr />
                        <p>If you delete your profile there is no way back</p>
                        {deleteFetching && <Loader/>}

                        {deleteConfirm ?
                        <>
                        <p><b>Are you 100% sure?</b></p>
                        <button onClick={() => setDeleteConfirm(false)} disabled={deleteFetching} className="btn btn-secondary"> Cancel</button>
                        <button onClick={() => {
                            dispatch(deleteUser(user.id));
                        }} disabled={deleteFetching} className="btn btn-danger ms-1">I'm sure I want to delete</button>
                        </>
                        :
                        <button onClick={() => setDeleteConfirm(true)} className="btn btn-danger">Delete</button>
                        }
                    </div>
                </div>
                </>
            }
        </div>
       ) 
    }

    return (
        <div className="container p-5">
            <img className="m-auto d-block" width={250} src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg" alt={user.first_name + "'s profile picture"}/>
            <h2 className="text-center">{user?.first_name} {user?.last_name}</h2>
            <p className="text-center text-muted">{user?.email}</p>
            {isMe && 
                <div className="row">

                    <button onClick={() => setEditing(true)} className="btn btn-primary col-lg-4 offset-lg-4 my-1">Edit</button>
                </div>
            }
        </div>
    );
}

export default withAuthentication(UserProfile);