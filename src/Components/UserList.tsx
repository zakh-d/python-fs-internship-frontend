import { Link } from "react-router-dom";
import User from "../Types/UserType"
import { getUserProfilePath } from "../Utils/router";
import Table from "./Table/Table";

const UserList = ({users}: {users: User[]}) => {
    const userItems = users.map((user) => ({
        id: user.id,
        items: [
            <Link to={getUserProfilePath(user.id)}>{user.username}</Link>,
            user.email,
            (new Date(user.created_at)).toLocaleDateString()
        ]
    }));
    return (
        <Table theadData={['Username', 'Email', 'Joined']} tbodyData={userItems}/>
    )
}

export default UserList;