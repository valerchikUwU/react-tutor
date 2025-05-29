import { Goal } from "../../types/goal"
import { useAxiosSecure } from "../useAxiosSecure";
import { GoalService } from "../../services/goalService/goalService";
import { useQuery } from "@tanstack/react-query";


export const useGoal = (organizationId: string) => {
    const axiosSecure = useAxiosSecure();

    return useQuery<Goal | null, Error>({
        queryKey: ['goals', organizationId],
        queryFn: () => GoalService.getGoal(organizationId, axiosSecure),
        enabled: !!organizationId,
        refetchOnWindowFocus: false, // Не обновлять при фокусе окна
        retry: 1, // Количество попыток при ошибке
    });
}