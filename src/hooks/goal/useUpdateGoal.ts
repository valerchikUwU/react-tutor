import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosSecure } from "../useAxiosSecure";
import { GoalService } from "../../services/goalService/goalService";
import { GoalUpdateDto } from "../../types/goal/goalUpdateDto";

export const useUpdateGoal = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ goalId, goalUpdateDto }: { goalId: string; goalUpdateDto: GoalUpdateDto }) =>
            GoalService.updateGoal(goalId, goalUpdateDto, axiosSecure),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['goals', data] });
        },
        // Опционально: оптимистичное обновление
        onMutate: async (variables) => {
            await queryClient.cancelQueries({queryKey: ['goals', variables.goalId]});
            const previousGoal = queryClient.getQueryData(['goals', variables.goalId]);

            queryClient.setQueryData(
                ['goals', variables.goalId],
                (old: GoalUpdateDto | undefined) =>
                    old ? { ...old, ...variables.goalUpdateDto } : variables.goalUpdateDto
            );

            return { previousGoal };
        },
        onError: (err, variables, context) => {
            if (context?.previousGoal) {
                queryClient.setQueryData(['goals', variables.goalId], context.previousGoal);
            }
            throw err;
        }
    });
};