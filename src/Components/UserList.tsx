import User from "../Types/UserType"
import Table from "./Table/Table";

const UserList = ({users}: {users: User[]}) => {
    const userItems = users.map((user) => ({
        id: user.id,
        items: [
            user.username,
            user.email,
            (new Date(user.created_at)).toLocaleDateString()
        ]
    }));
    return (
        <Table theadData={['Username', 'Email', 'Joined']} tbodyData={userItems}/>
    )
}

export default UserList;