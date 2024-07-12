import { useLoaderData } from "react-router-dom";
import User from "../Types/UserType";

const UserProfile = () => {
    const user: User = useLoaderData() as User;

    return (
        <div className="container p-5">
            <img className="m-auto d-block" width={250} src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg" alt={user.firstName + "'s profile picture"}/>
            <h2 className="text-center">{user.firstName} {user.lastName}</h2>
            <p className="text-center text-muted">{user.email}</p>
        </div>
    );
}

export default UserProfile;