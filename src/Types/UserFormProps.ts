import { UserDetail } from "./UserType";

type UserFormProps = {
    user?: UserDetail;
    onSubmitAdditionaly: () => void;
}

export default UserFormProps;