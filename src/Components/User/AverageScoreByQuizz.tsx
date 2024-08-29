import { ReactElement, useEffect } from "react";
import User from "../../Types/UserType";
import { selectAverageScoresByQuizzes } from "../../Store/selectors/analytics_selector";
import { useSelector } from "react-redux";
import useAppDispatch from "../../Store/hooks/dispatch";
import { fetchAverageUserScoreByQuizzes } from "../../Store/analyticsSlice";
import { Line } from "react-chartjs-2";
import { selectIsMe } from "../../Store/selectors/user_profile_selectors";

const AvereageScoreByQuizz = ({user}: {user: User}): ReactElement => {

    const dispatch = useAppDispatch();
    const averageScoreByQuizz = useSelector(selectAverageScoresByQuizzes);
    const isMe = useSelector(selectIsMe);

    useEffect(() => {
        if (user && isMe)
        {
            dispatch(fetchAverageUserScoreByQuizzes({userId: user.id}));
        }
    }, [user?.id]);

    const datasets = new Map();
    
    let maxLength = 0;

    averageScoreByQuizz.forEach((analytics) => {
        analytics.results.forEach((result) => {
            if (!datasets.has(result.quizz_id)) {
                const randomColor = Math.floor(Math.random()*16777215).toString(16);
                datasets.set(result.quizz_id, {
                    label: result.quizz_title,
                    data: [],
                    borderColor: `#${randomColor}`,
                    backgroundColor: `#${randomColor}`,
                });
            }
            datasets.get(result.quizz_id).data.push(result.score);
            if (datasets.get(result.quizz_id).data.length > maxLength) {
                maxLength = datasets.get(result.quizz_id).data.length;
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
        labels: averageScoreByQuizz.map((analytics) => new Date(analytics.date).toLocaleDateString()).reverse(),
        datasets: [...datasets.values()],
    }

    return (
        <>
            <h1>Average score by quizzes</h1>
            <Line data={data}/>
        </>
    )

}


export default AvereageScoreByQuizz;