import { useEffect, useState } from "react"
import { Goal } from "../../types/goal"
import { useAxiosSecure } from "../useAxiosSecure";
import { GoalService } from "../../services/goalService/goalService";


export const useGoal = (organizationId: string) => {
    const [goal, setGoal] = useState<Goal | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchGoal = async (organizationId: string) => {
            setLoading(true);
            try {
                console.log(organizationId)
                console.log('asdasdasdasdasdasd')
                const data = await GoalService.getGoal(organizationId, axiosSecure);
                setGoal(data);
            }
            catch (err) {
                console.log(err)
                setError('Failed to fetch goal');
            } finally {
                setLoading(false);
            }
        }
                console.log('asdasdasdasdasdasd')

        if (organizationId) {

            fetchGoal(organizationId);
        }
    }, [axiosSecure, organizationId]);

    return { goal, loading, error }
}