import Header from "../Components/Header"
import UserListItem from "../Components/UserListItem";
import User from "../Types/UserType"

const UserList = ({users}: {users: User[]}) => {
    const userItems = users.map((user) => <UserListItem user={user}/>);
    return (
        <div>
            <Header title="All Users"/>
            <ul>
                {userItems}
            </ul>
        </div>
    )
}

export default UserList;