import UserList from "../Components/UserList";
import User from "../Types/UserType";

const AllUsers = ({allUsers}: {allUsers: User[]}) => {
    return (
        <div className="container">

            <UserList users={allUsers}/>
        </div>
    )
}

export default AllUsers;