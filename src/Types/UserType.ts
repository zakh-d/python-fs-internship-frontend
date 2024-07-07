import { UUID } from "crypto";

type User = {
    id: UUID;
    firstName: string;
    lastName: string;
    email: string;
};


export default User;