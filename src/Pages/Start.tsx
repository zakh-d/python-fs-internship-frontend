import {ReactElement} from "react";
import Header from "../Components/Header";

const Start = (): ReactElement => {
    return (
        <div>
            <Header title={'Home Page'}/>

            <section className="container-fluid">
                <h1>Welcome</h1>
            </section>
        </div>
    );
}

export default Start;