import Header from "../Components/Header";
import {Link} from "react-router-dom";

const PageNotFound = () => {
    return (
        <div>
            <Header title={'Page was not found'}/>
            <section className="container">
                <h1>404 :(</h1>
                <Link to={'/'}>Go to Home Page</Link>
            </section>
        </div>
    )
}

export default PageNotFound;