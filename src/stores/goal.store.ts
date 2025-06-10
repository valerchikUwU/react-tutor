import { makeAutoObservable } from "mobx";
import { GoalUpdateDto } from "../types/goal/goalUpdateDto";
import { GoalCreateDto } from "../types/goal/goalCreateDto";

class GoalStore {

    goalsDtoMap = new Map<string, GoalCreateDto | GoalUpdateDto>();

    constructor() {
        makeAutoObservable(this);
    }

    getGoalDto(organizationId: string){
        return this.goalsDtoMap.get(organizationId)
    }

    setGoalDto(organizationId: string, goalDto: GoalUpdateDto | GoalCreateDto){
        this.goalsDtoMap.set(organizationId, goalDto)
    }

    log(){
        console.log(this.goalsDtoMap)
    }
}

export const goalStore = new GoalStore();