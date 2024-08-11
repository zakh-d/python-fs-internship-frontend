import Table from "../Table/Table";
import { Link } from "react-router-dom";
import { getUserProfilePath } from "../../Utils/router";
import User from "../../Types/UserType";

const CompanyInvitesList = ({users, cancelFunc}: {users: User[], cancelFunc: (userId: string) => void}) => {
    
    const userItems = users.map((user) => ({
        id: user.id,
        items: [
            <Link to={getUserProfilePath(user.id)}>{user.username}</Link>,
            user.email,
            <button className="btn btn-danger" onClick={() => cancelFunc(user.id)}>Cancel</button>
        ]
    }));

    return (
        <Table theadData={['Username', 'Email', '']} tbodyData={userItems}/>
    )
}

export default CompanyInvitesList;