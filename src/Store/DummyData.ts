import { randomUUID } from "node:crypto";
import User from "../Types/UserType";

export const users: User[] = [
    {
        id: randomUUID(),
        firstName: "John",
        lastName: "Doe",
        email: ""
    },
    {
        id: randomUUID(),
        firstName: "Jane",
        lastName: "Doe",
        email: ""
    },
    {
        id: randomUUID(),
        firstName: "Joe",
        lastName: "Doe",
        email: ""
    },
    {
        id: randomUUID(),
        firstName: "Jill",
        lastName: "Doe",
        email: ""
    },
    {
        id: randomUUID(),
        firstName: "Jack",
        lastName: "Doe",
        email: ""
    }
]