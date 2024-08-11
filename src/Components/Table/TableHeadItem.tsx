import { Key, ReactNode } from "react"

type TableItemProps = {
    item: ReactNode,
    key?: Key
}

const TableHeadItem = ({item}: TableItemProps) => {
    return (
        <th>{item}</th>
    )
}

export default TableHeadItem;