import Table from "../Table/Table";
import { Link } from "react-router-dom";
import { getUserProfilePath } from "../../Utils/router";
import User from "../../Types/UserType";
import { ActionButton } from "../../Types/ActionButton";
import { ReactElement } from "react";


type ActionDisabled = {
    key: (item: any) => boolean;
    actionIndex: number;
}

type PropsType = {
    users: User[];
    actions: ActionButton[];
    actionsDisabled?: ActionDisabled[];
}

const UserListWithActionButton = ({users, actions, actionsDisabled}: PropsType): ReactElement => {
    const userItems = users.map((user) => ({
        id: user.id,
        items: [
            <Link to={getUserProfilePath(user.id)}>{user.username}</Link>,
            user.email,
            actions.map((action, index) => {
                if (actionsDisabled) {
                    const isDisabled = actionsDisabled.find((disabled) => disabled.key(user) && disabled.actionIndex === index);
                    
                    if (isDisabled) {
                        return (
                            <button className={`btn ${action.customClass}`} disabled>{action.text}</button>
                        )
                    }
                }
                return (
                <button className={`btn ${action.customClass}`} onClick={() => action.func(user.id)}>{action.text}</button>
            )})
        ]
    }));

    return (
        <Table theadData={['Username', 'Email', '']} tbodyData={userItems}/>
    )
}

export default UserListWithActionButton;