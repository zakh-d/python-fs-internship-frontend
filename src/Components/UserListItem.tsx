import User from "../Types/UserType";

const UserListItem = ({ user }: {user: User}) => {
    return (
        <li key={user.id}>
            <span>{user.firstName} {user.lastName}</span>
            <span>{user.email}</span>
        </li>
    );
}

export default UserListItem;