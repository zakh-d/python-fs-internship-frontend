import UserList from "../Components/UserList/UserList";
import User from "../Types/UserType";
import {withAuthentication} from "../Utils/hoc/auth_redirect";

interface PropsType extends JSX.IntrinsicAttributes {
    allUsers: User[],
}

const AllUsers = ({allUsers}: PropsType) => {
    return (
        <div className="container">

            <UserList users={allUsers}/>
        </div>
    )
}

export default withAuthentication(AllUsers);
