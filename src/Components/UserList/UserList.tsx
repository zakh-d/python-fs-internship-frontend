import UserListItem from "./UserListItem";
import User from "../../Types/UserType"

const UserList = ({users}: {users: User[]}) => {
    const userItems = users.map((user) => <UserListItem user={user}/>);
    return (
        <table className="table">
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
            </tr>
            {userItems}
        </table>
    )
}

export default UserList;