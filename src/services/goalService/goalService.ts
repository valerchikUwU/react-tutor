import { AxiosInstance } from "axios";
import { GoalReadDto } from "../../types/goal/goalReadDto";
import { GoalCreateDto } from "../../types/goal/goalCreateDto";
import { GoalUpdateDto } from "../../types/goal/goalUpdateDto";

export const GoalService = {
    async getGoal(organizationId: string, axios: AxiosInstance): Promise<GoalReadDto | null> {
        try {
            const response = await axios.get(`/goals/${organizationId}`);
            return response.data;
        } catch (err) {
            console.error('Error fetching goal:', err)
            throw err
        }
    },


    async updateGoal(goalId: string, goalUpdateDto: GoalUpdateDto, axios: AxiosInstance): Promise<string> {
        try {
            const response = await axios.patch(`/goals/${goalId}/update`, goalUpdateDto);
            return response.data.id;
        } catch (err) {
            console.error('Error updating goal:', err)
            throw err
        }
    },

    async createGoal(goalCreateDto: GoalCreateDto, axios: AxiosInstance): Promise<void> {
        try {
            const response = await axios.post(`/goals/new`, goalCreateDto);
            return response.data.id;
        } catch (err) {
            console.error('Error creating goal:', err)
            throw err
        }
    }
}
