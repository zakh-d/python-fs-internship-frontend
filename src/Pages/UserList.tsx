import Header from "../Components/Header"
import UserListItem from "../Components/UserListItem";
import User from "../Types/UserType"

const UserList = ({users}: {users: User[]}) => {
    const userItems = users.map((user) => <UserListItem user={user}/>);
    return (
        <div>
            <Header title="All Users"/>
            <div className="container">

                <table className="table">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                    {userItems}
                </table>
            </div>
        </div>
    )
}

export default UserList;