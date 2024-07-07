import User from "../Types/UserType";

const UserListItem = ({ user }: {user: User}) => {
    return (
        <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
        </tr>
    );
}

export default UserListItem;