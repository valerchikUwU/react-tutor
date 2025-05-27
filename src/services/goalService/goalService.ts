import { AxiosInstance } from "axios";
import { Goal } from "../../types/goal";

export const GoalService = {
    async getGoal(organizationId:string, axios: AxiosInstance): Promise<Goal | null> {
        try {
            console.log(organizationId)
            const response = await axios.get(`/goals/${organizationId}`);
            console.log(response.data)
            return response.data
        } catch(err){
            console.error('Error fetching goal:', err)
            throw err
        }
    }
}
