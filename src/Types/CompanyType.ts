import { UUID } from "crypto";

type Company = {
    id: UUID;
    name: string;
    address: string;
    city: string;
    country: string;
    email: string;
    phone: string;
}
export default Company;