import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {withAuthentication} from "../Utils/hoc/auth_redirect";
import { Key, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCompletions, selectCurrentUser, selectDeleteFetching, selectIsFetching, selectIsMe, selectUserCumulativeRating } from "../Store/selectors/user_profile_selectors";
import useAppDispatch from "../Store/hooks/dispatch";
import { deleteUser, getUser } from "../Store/thunks/users_thunk";
import Loader from "../Components/Loader";
import UserUpdateForm from "../Components/User/UserUpdateForm";
import ModalWindow from "../Components/ModalWindow";
import UpdatePasswordForm from "../Components/User/UpdatePasswordForm";
import { eraseErrors, fetchUserLastestQuizzCompletions, fetchUserRating } from "../Store/userProfileSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { getUserProfileEditPasswordPath, getUserProfileEditPath } from "../Utils/router";
import QuizzCompletionList from "../Components/Quizz/QuizzCompletionList";
import { Rating } from "react-simple-star-rating";

const UserProfile = ({editing, changePassword}: {editing: boolean, changePassword?: boolean}) => {
    const {userId} = useParams();

    const {isAuthenticated} = useAuth0();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useSelector(selectCurrentUser);
    const fetching = useSelector(selectIsFetching);
    const deleteFetching = useSelector(selectDeleteFetching);
    const isMe = useSelector(selectIsMe);
    const completions = useSelector(selectCompletions);
    const cumulativeRating = useSelector(selectUserCumulativeRating);

    const [deleteConfirm, setDeleteConfirm] = useState(false);

    useEffect(() => {
        if (!userId || fetching) {
            return;
        }
        dispatch(getUser(userId));
        dispatch(fetchUserRating({userId}));
    }, [userId]);

    useEffect(() => {
        if (!isMe || !userId) {
            return;
        }
        dispatch(fetchUserLastestQuizzCompletions({userId}));
    }, [isMe, userId]);

    if (fetching) {
        return <Loader/>;
    }   
    
    if (!user) {
        return <div className="container pt-4">
            <h3 className="text-center">User not found</h3>
        </div>
    }
    
    if (editing && !isMe && !fetching) { 
        return <Navigate to={'/users/' + userId}/>
    }
 
    if (editing) {
       return (
        <div className="container p-5">
            <img className="m-auto d-block" width={250} src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg" alt={user.first_name + "'s profile picture"}/>
            <UserUpdateForm user={user} onSubmitAdditionaly={() => {}}/>
            <ModalWindow isOpen={changePassword || false} onClose={() => {
                navigate('/users/' + user.id + '/edit');
                dispatch(eraseErrors());
            }} title="Change password">
                <UpdatePasswordForm user={user} onSubmitAdditionaly={() => {}}/>
            </ModalWindow>
            <div className="row">
                {
                !isAuthenticated &&    
                <div className="alert alert-warning col-lg-4 offset-lg-4 p-2 mt-4">
                    <h3>Update Password</h3>
                    <hr />
                    <p>If you want to update your password, please click the button below</p>
                    <Link to={getUserProfileEditPasswordPath(user.id)} className="btn btn-warning">Update Password</Link>
                </div>
                }
            </div>
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
        </div>
       ) 
    }

    return (
        <div className="container p-5">
            <img className="m-auto d-block" width={250} src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg" alt={user.first_name + "'s profile picture"}/>
            <h2 className="text-center">{user?.first_name} {user?.last_name}</h2>
            <p className="text-center text-muted">{user?.email}</p>
            <p className="text-center">

                <Rating 
                    initialValue={cumulativeRating / 10}
                    iconsCount={10}
                    allowFraction
                    readonly
                />
            </p>
            {isMe && 
                <div className="row">

                    <Link to={getUserProfileEditPath(user.id)} className="btn btn-primary col-lg-4 offset-lg-4 my-1">Edit</Link>

                    <h3 className="text-center mt-4">Latest Quizz Completions</h3>
                    <QuizzCompletionList completions={completions || []}/>
                </div>
            }
        </div>
    );
}

export default withAuthentication<{editing: boolean, changePassword?: boolean, key?: Key | null}>(UserProfile);