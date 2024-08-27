import { ReactElement, useEffect } from "react";
import useAppDispatch from "../../Store/hooks/dispatch";
import { useSelector } from "react-redux";
import { fetchMembersAverageScores } from "../../Store/analyticsSlice";
import { selectAverageMembersScores } from "../../Store/selectors/analytics_selector";
import { Line } from "react-chartjs-2";
import Company from "../../Types/CompanyType";


const AverageMembersScores = ({company}: {company: Company}): ReactElement => {
    const dispatch = useAppDispatch();
    const averageMembersScores = useSelector(selectAverageMembersScores);

    useEffect(() => {
        if (company)
        {
            dispatch(fetchMembersAverageScores({companyId: company.id}));
        }
    }, [company?.id]);

    const datasets = new Map();

    let maxLength = 0;
    
    averageMembersScores.forEach((analytics) => {
        analytics.results.forEach((result) => {
            if (!datasets.has(result.user_email)) {
                const randomColor = Math.floor(Math.random()*16777215).toString(16);
                datasets.set(result.user_email, {
                    label: result.user_email,
                    data: [],
                    borderColor: `#${randomColor}`,
                    backgroundColor: `#${randomColor}`,
                });
            }
            datasets.get(result.user_email).data.push(result.score);
            if (datasets.get(result.user_email).data.length > maxLength) {
                maxLength = datasets.get(result.user_email).data.length;
            }
        })
    });
    
    for (let key of datasets.keys()) {
        while (datasets.get(key).data.length < maxLength) {
            datasets.get(key).data.push(null);
        }
        datasets.get(key).data.reverse();
    }

    const data = {
        labels: averageMembersScores.map((analytics) => new Date(analytics.date).toLocaleDateString()).reverse(),
        datasets: [...datasets.values()],
    }

    return (
        <>
            <h1>Average members scores</h1>
            <Line data={data}/>
        </>
    )
}

export default AverageMembersScores;