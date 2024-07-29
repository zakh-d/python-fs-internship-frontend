import { ReactElement } from "react";
import { Form as FinalForm } from "react-final-form";
import Input from "./Input";
import UserFormProps from "../Types/UserFormProps";
import useAppDispatch from "../Store/hooks/dispatch";
import { updatePassword } from "../Store/thunks/users_thunk";
import { useSelector } from "react-redux";
import { selectErrors, selectPasswordChangeFetching } from "../Store/selectors/user_profile_selectors";
import { useNavigate } from "react-router-dom";

const UpdatePasswordForm = ({user, onSubmitAdditionaly}: UserFormProps): ReactElement => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const errors = useSelector(selectErrors) || [];
    const errorsListItems = errors.map((error) => <li>{error}</li>);

    const fetching = useSelector(selectPasswordChangeFetching);

    return (
        <FinalForm
            name="update-password-form"
            onSubmit={(values) => {
                if (!user) {
                    return;
                }
                dispatch(updatePassword(user.id, values.old_password, values.new_password, () => {
                    navigate('/users/' + user.id + '/edit');
                }));
                onSubmitAdditionaly();
            }}
            validate={(values) => {
                const errors: Record<string, string> = {};
                if (!values.old_password) {
                    errors.old_password = "Old password is required";
                }
                if (!values.new_password) {
                    errors.new_password = "New password is required";
                }
                if (values.new_password !== values.new_password_confirm) {
                    errors.new_password_confirm = "Passwords do not match";
                }
                return errors;
            }}
            render={({handleSubmit}) => (
                <form onSubmit={handleSubmit} className="d-flex flex-column">
                    <Input labelText="Old Password:" name="old_password" type="password" disabled={fetching}/>
                    <Input labelText="New Password:" name="new_password" type="password" disabled={fetching}/>
                    <Input labelText="New Password Repeat:" name="new_password_confirm" type="password" disabled={fetching}/>
                    <button className="btn btn-primary mt-2" type="submit" disabled={fetching}>Update Password</button>
                    {errors.length > 0 && <div className="alert alert-danger mt-2"><ul><>{errorsListItems}</></ul></div>}
                </form>
            )}
        />
    )
}

export default UpdatePasswordForm;