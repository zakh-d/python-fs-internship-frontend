import { ReactElement } from "react";
import Table from "../Table/Table";
import { QuizzCompletionInfo } from "../../Types/QuizzTypes";

const QuizzCompletionList = ({completions}: {completions: QuizzCompletionInfo[]}): ReactElement => {

    const tbodyData = completions.map((completion) => {
        const date = new Date(completion.completion_time);
        return {
            id: completion.quizz_id,
            items: [
                completion.quizz_title,
                date.toLocaleDateString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'}) + ' ' + date.toLocaleTimeString('en-GB')
            ]
        }
    });

    return (
        <Table theadData={['Quizz Title', 'Latest Complition Date']} tbodyData={tbodyData}/>
    )
}

export default QuizzCompletionList;