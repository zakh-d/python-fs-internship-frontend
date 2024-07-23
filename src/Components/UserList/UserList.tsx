import UserListItem from "./UserListItem";
import User from "../../Types/UserType"

const UserList = ({users}: {users: User[]}) => {
    const userItems = users.map((user) => <UserListItem user={user}/>);
    return (
        <table className="table">
            <thead>    
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Joined</th>
                </tr>
            </thead>
            <tbody>
                {userItems}
            </tbody>
        </table>
    )
}

export default UserList;