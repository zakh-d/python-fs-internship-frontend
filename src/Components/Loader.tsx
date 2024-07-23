import { ReactElement, useEffect, useState } from "react";

const Loader = (): ReactElement => {

    const [dotCount, setDotCount] = useState(1);

    useEffect(() => {}, [
        setInterval(() => {
            setDotCount((dotCount + 1) % 4);
        }, 200)
    ]);
    return (
        <div className="container">
            <h3 className="text-center">Loading{'.'.repeat(dotCount)}</h3>
        </div>
    )
}

export default Loader;