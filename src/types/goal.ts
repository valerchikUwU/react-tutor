import { Organization } from "./organization";

export type Goal = {
    id: string;
    content: string[];
    createdAt: Date;
    updatedAt: Date;
    organization?: Organization;
}

