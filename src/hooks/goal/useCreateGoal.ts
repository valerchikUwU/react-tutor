import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosSecure } from "../useAxiosSecure";
import { GoalService } from "../../services/goalService/goalService";
import { GoalCreateDto } from "../../types/goal/goalCreateDto";

export const useCreateGoal = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ goalCreateDto }: { goalCreateDto: GoalCreateDto }) =>
            GoalService.createGoal(goalCreateDto, axiosSecure),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['goals', data] });
        },
    });
}