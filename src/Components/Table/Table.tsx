import { Key, ReactNode } from "react";
import TableHeadItem from "./TableHeadItem";
import TableRow from "./TableRow";

type TableProps = {
    theadData: ReactNode[];
    tbodyData: {
        id: Key;
        items: ReactNode[]
    }[];
}

const Table = ({theadData, tbodyData}: TableProps) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    {theadData.map((h) => <TableHeadItem key={h?.toString()} item={h}/>)}
                </tr>
            </thead>
            <tbody>
                {tbodyData.map((item) => (
                    <TableRow key={item.id} data={item.items}/>
                ))}
            </tbody>
        </table>
    )    
}

export default Table;