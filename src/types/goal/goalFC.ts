import { GoalCreateDto } from "./goalCreateDto";
import { GoalReadDto } from "./goalReadDto";

export type GoalFC = {
    goal: GoalReadDto | GoalCreateDto | null;
    isLoading: boolean;
    error: Error | null;
    onDeleteBlock: (index: number) => void;
    onTextChange: (index: number, text: string) => void;
}