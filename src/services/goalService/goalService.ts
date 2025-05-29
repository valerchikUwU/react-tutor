import { AxiosInstance } from "axios";
import { Goal } from "../../types/goal";

export const GoalService = {
    async getGoal(organizationId:string, axios: AxiosInstance): Promise<Goal | null> {
        try {
            const response = await axios.get(`/goals/${organizationId}`);
            return response.data
        } catch(err){
            console.error('Error fetching goal:', err)
            throw err
        }
    }
}
