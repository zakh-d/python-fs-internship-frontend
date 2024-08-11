import Table from "./Table/Table";
import { Link } from "react-router-dom";
import { getUserProfilePath } from "../Utils/router";
import User from "../Types/UserType";


type Action = {
    func: (userId: string) => void,
    text: string,
    customClass: string
}
const UserListWithActionButton = ({users, actions}: {users: User[], actions: Action[]}) => {
    const userItems = users.map((user) => ({
        id: user.id,
        items: [
            <Link to={getUserProfilePath(user.id)}>{user.username}</Link>,
            user.email,
            actions.map((action) => (
                <button className={`btn ${action.customClass}`} onClick={() => action.func(user.id)}>{action.text}</button>
            ))
        ]
    }));

    return (
        <Table theadData={['Username', 'Email', '']} tbodyData={userItems}/>
    )
}

export default UserListWithActionButton;