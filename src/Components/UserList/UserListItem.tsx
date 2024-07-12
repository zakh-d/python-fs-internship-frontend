import { Link } from "react-router-dom";
import User from "../../Types/UserType";

const UserListItem = ({ user }: {user: User}) => {
    return (
        <tr key={user.id}>
            <td><Link to={"/users/" + user.id}>{user.firstName}</Link></td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
        </tr>
    );
}

export default UserListItem;