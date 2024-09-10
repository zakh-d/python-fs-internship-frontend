import { Key, ReactElement, ReactNode } from "react";

type TableRowProps = {
    data: ReactNode[];
    key?: Key
}

const TableRow = ({data}: TableRowProps): ReactElement => {
    return (
        <tr>
            {data.map((item) => (
                <td key={item?.toString()}>{item}</td>
            ))}
        </tr>
    );
}

export default TableRow;