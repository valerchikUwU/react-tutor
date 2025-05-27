import { Goal } from "./goal"

export type GoalFC = {
    goal: Goal | null;
    loading: boolean;
    error: string | null;
}