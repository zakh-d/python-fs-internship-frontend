import HealthInfo from "../Types/HealthInfo";

const HealthInfoItem = ({ className, itemName, healthInfo }: {className: string, itemName: string, healthInfo : HealthInfo}) => {
    return (
        <div className={className + " text-center"}>
            <h3>{itemName}</h3>
            <p>
                Status code: {healthInfo.status_code || '---'} <br />
                Details: {healthInfo.details || '---'} <br />
                Result: {healthInfo.result || '---'}
            </p>
        </div>
    );
}


export default HealthInfoItem;