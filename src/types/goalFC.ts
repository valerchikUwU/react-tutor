import { Goal } from "./goal"

export type GoalFC = {
    goal: Goal | null;
    isLoading: boolean;
    error: Error | null;
}