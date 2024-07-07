import Header from "../Components/Header";
import UserList from "../Components/UserList";
import User from "../Types/UserType";

const AllUsers = ({allUsers}: {allUsers: User[]}) => {
    return (
        <div>
            <Header title="All Users"/>
            <div className="container">

                <UserList users={allUsers}/>
            </div>
        </div>
    )
}

export default AllUsers;