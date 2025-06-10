import { Organization } from "../organization";

export type GoalReadDto = {
    id: string;
    content: string[];
    createdAt: Date;
    updatedAt: Date;
    organization?: Organization;
}

