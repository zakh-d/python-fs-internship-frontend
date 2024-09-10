import ModalWindow from "../Components/ModalWindow";
import { useDispatch, useSelector } from "react-redux";
import { selectTestString } from "../Store/selectors/test_selector";
import { changeTestString } from "../Store/testSlice";
import { ReactElement, useEffect } from "react";
import { healthApi } from "../Api/health-api";
import { setAppHealth, setDbHealth, setHealth, setRedisHealth } from "../Store/healthSlice";
import { selectAppHealth, selectDbHealth, selectRedisHealth } from "../Store/selectors/health_selector";
import HealthInfoItem from "../Components/HealthInfoItem";
import HealthInfo from "../Types/HealthInfo";


function apiCallAndUpdateStore(dispatch: any) {
    healthApi.getHealth().then((data) => {
        dispatch(setHealth(data));
    }).catch(() => {
        dispatch(setAppHealth({
            status_code: 500,
            details: "API is not available, cannot determine the health of db and redis",
            result: "FAIL"
        }));
        const emptyHealth: HealthInfo = {
            status_code: 0,
            details: "",
            result: ""
        }
        dispatch(setDbHealth(emptyHealth));
        dispatch(setRedisHealth(emptyHealth));
    });
}

const Start = (): ReactElement => {

    const testString = useSelector(selectTestString);

    const appHealth = useSelector(selectAppHealth);
    const redisHealth = useSelector(selectRedisHealth);
    const dbHealth = useSelector(selectDbHealth);

    const dispatch = useDispatch();

    useEffect(() => {
        
        apiCallAndUpdateStore(dispatch);

        const interval = setInterval(() => {
            apiCallAndUpdateStore(dispatch);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="container-fluid">
            
            <ModalWindow isOpen={true} onClose={() => {
                dispatch(changeTestString("Hi there again!"))
            }}>
                <h2>Welcome o my website</h2>
                <p>{testString}</p>
            </ModalWindow>
            
            <div className="row p-5">

                <h1 className="text-center">Health Check Info</h1>
                <hr className="my-4"/>
                <HealthInfoItem className="col-4" itemName="App" healthInfo={appHealth} />
                <HealthInfoItem className="col-4" itemName="DB" healthInfo={dbHealth} />
                <HealthInfoItem className="col-4" itemName="Redis" healthInfo={redisHealth} />
            </div>
        </section>
    );
}

export default Start;