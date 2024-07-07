import { users } from "../Store/DummyData";
import User from "../Types/UserType";

export async function userLoader({params}: any): Promise<User | undefined> {
    const userId = params.userId;
    return users.find((user) => user.id === userId);
}