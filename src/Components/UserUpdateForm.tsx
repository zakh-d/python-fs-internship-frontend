import { ReactElement } from "react";
import {Form as FinalForm} from "react-final-form";
import { UserUpdate } from "../Types/UserType";
import useAppDispatch from "../Store/hooks/dispatch";
import { updateUser } from "../Store/thunks/users_thunk";
import Input from "./Input";
import UserFormProps from "../Types/UserFormProps";
import { Link } from "react-router-dom";
import { getUserProfilePath } from "../Utils/router";


const UserUpdateForm = ({user, onSubmitAdditionaly}: UserFormProps): ReactElement => {
   
    const dispatch = useAppDispatch();

    if (!user) {
        return <div className="container pt-4">
            <h3 className="text-center">User not found</h3>
        </div>
    }

    return (
        <FinalForm
                onSubmit={(values) => {
                    const new_data: UserUpdate = {
                        first_name: values.first_name,
                        last_name: values.last_name,
                        username: values.username,
                    }
                    dispatch(updateUser(user.id, new_data));
                    onSubmitAdditionaly();
                }}
                render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit} className="col-lg-4 offset-lg-4">
                        <Input name="first_name" value={user.first_name} labelText="First Name" type="text"/>
                        <Input name="last_name" value={user.last_name} labelText="Last Name" type="text"/>
                        <Input name="username" value={user.username} labelText="Username" type="text"/>
                        <Input name="email" value={user.email} labelText="Email" type="email" disabled={true}/>

                        <div className="mt-2 d-flex">
                            <Link to={getUserProfilePath(user.id)} className="btn btn-danger flex-grow-1 me-1">Cancel</Link>
                            <button className="btn btn-primary flex-grow-1 ms-1" type="submit">Save</button>
                        </div>
                    </form>
                )}
            />
        )
}

export default UserUpdateForm;