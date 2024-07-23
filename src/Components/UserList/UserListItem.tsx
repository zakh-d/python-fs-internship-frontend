import { Link } from "react-router-dom";
import User from "../../Types/UserType";

const UserListItem = ({ user }: {user: User}) => {
    return (
        <tr key={user.id}>
            <td><Link to={"/users/" + user.id}>{user.username}</Link></td>
            <td>{user.email}</td>
            <td>{(new Date(user.created_at)).toLocaleDateString()}</td>
        </tr>
    );
}

export default UserListItem;