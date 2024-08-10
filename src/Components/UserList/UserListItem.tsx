import { Link } from "react-router-dom";
import User from "../../Types/UserType";
import { getUserProfilePath } from "../../Utils/router";

const UserListItem = ({ user }: {user: User}) => {
    return (
        <tr key={user.id}>
            <td><Link to={getUserProfilePath(user.id)}>{user.username}</Link></td>
            <td>{user.email}</td>
            <td>{(new Date(user.created_at)).toLocaleDateString()}</td>
        </tr>
    );
}

export default UserListItem;