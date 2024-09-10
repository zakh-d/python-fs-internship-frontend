import Table from "./Table";
import { ActionButton } from "../../Types/ActionButton";
import { ReactElement } from "react";


interface HasId {
    id: string;
}

type ActionDisabled<T extends HasId> = {
    key: (item: T) => boolean;
    actionIndex: number;
}


type PropsType<T extends HasId> = {
    items: T[];
    actions: ActionButton[];
    actionsDisabled?: ActionDisabled<T>[];
    dataGetters: ((item: T | null) => JSX.Element | string)[];
}

const TableWithActionButton = <T extends HasId>({items: users, dataGetters, actions, actionsDisabled}: PropsType<T>): ReactElement => {
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

export default TableWithActionButton;