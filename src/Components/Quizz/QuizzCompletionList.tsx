import { ReactElement } from "react";
import { QuizzCompletionInfo } from "../../Types/QuizzTypes";
import TableWithActionButton from "../Table/TableWithActionButton";
import { quizzCompletionDataGetters } from "../../Utils/list_utils";
import { ActionButton } from "../../Types/ActionButton";
import useAppDispatch from "../../Store/hooks/dispatch";
import { downloadUserResponse } from "../../Store/quizzSlice";
import { selectMe } from "../../Store/selectors/auth_selector";
import { useSelector } from "react-redux";

const QuizzCompletionList = ({completions}: {completions: QuizzCompletionInfo[]}): ReactElement => {

    const dispatch = useAppDispatch();
    const me = useSelector(selectMe);
    const actions: ActionButton[] = [
        {
            func: function (id: string): void {
                if (!me) return;
                dispatch(downloadUserResponse({
                    quizzId: id,
                    userId: me?.id,
                    format: "csv"
                }))
            },
            text: "Download",
            customClass: "btn-success"
        }
    ];

    return (
        <TableWithActionButton<QuizzCompletionInfo & {id: string}> items={completions.map(c => ({...c, id: c.quizz_id}))} actions={actions} dataGetters={quizzCompletionDataGetters} />
    )
}

export default QuizzCompletionList;