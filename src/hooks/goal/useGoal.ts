import { GoalReadDto } from "../../types/goal/goalReadDto"
import { useAxiosSecure } from "../useAxiosSecure";
import { GoalService } from "../../services/goalService/goalService";
import { useQuery } from "@tanstack/react-query";


export const useGoal = (organizationId: string) => {
    const axiosSecure = useAxiosSecure();

    return useQuery<GoalReadDto | null, Error>({
        queryKey: ['goals', organizationId],
        queryFn: () => GoalService.getGoal(organizationId, axiosSecure),
        enabled: !!organizationId,
        refetchOnWindowFocus: false,
        retry: 1,
    });
}