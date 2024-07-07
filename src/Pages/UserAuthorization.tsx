import { ReactElement } from "react";

const UserAuthorization = ():ReactElement => {
    return (
        <section className="row justify-content-center">
            <h1 className="text-center">User Authorization</h1>
            <form className="col-lg-4 my-5 py-5 shadow rounded">
                <div>
                    <label className="form-label" htmlFor="email">Email:</label>
                    <input className="form-control" type="email" id="email" name="email" required/>
                </div>
                <div>
                    <label className="form-label" htmlFor="password">Password:</label>
                    <input className="form-control" type="password" id="password" name="password" required/>
                </div>
                <button className="btn btn-primary mt-2">Login</button>
            </form>
        </section>
    );
}

export default UserAuthorization;