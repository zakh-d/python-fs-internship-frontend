import { UUID } from "crypto";

type User = {
    id: UUID;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
};


export default User;