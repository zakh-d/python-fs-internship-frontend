import Table from "../Table/Table";
import User from "../../Types/UserType";
import { ActionButton } from "../../Types/ActionButton";
import { ReactElement } from "react";


type ActionDisabled = {
    key: (item: any) => boolean;
    actionIndex: number;
}

type PropsType<T extends User> = {
    users: T[];
    actions: ActionButton[];
    actionsDisabled?: ActionDisabled[];
    dataGetters: ((item: T | null) => JSX.Element | string)[];
}

const UserListWithActionButton = <T extends User>({users, dataGetters, actions, actionsDisabled}: PropsType<T>): ReactElement => {
    const userItems = users.map((user) => ({
        id: user.id,
        items: [
            ...dataGetters.map((getter) => getter(user)),
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
        <Table theadData={[...dataGetters.map(getter => getter(null)), '']} tbodyData={userItems}/>
    )
}

export default UserListWithActionButton;