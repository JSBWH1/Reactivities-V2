import { useQuery, useMutation } from "@tanstack/react-query";
import agent from "../api/agent"; // our axios instance (instead of writing axios.get followed by a full http address, we can just write agent.get followed by the endpoint we want to access)
import { useQueryClient } from "@tanstack/react-query";

export const useActivities = () => {
    // Custom hook to manage activities

    const queryClient = useQueryClient();

    const {data: activities, isPending} = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<Activity[]>('/activities');
            return response.data;
        }
    }); 


    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put('/activities', activity)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ 
                queryKey: ['activities'] 
            });
            // This will refetch the activities after a successful update
        }
    })


    const createActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.post('/activities', activity)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ 
                queryKey: ['activities'] 
            });
            // This will refetch the activities after a successful update
        }
    })

    const deleteActivity = useMutation({
        mutationFn: async (id : string) => {
            await agent.delete(`/activities/${id}`)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ 
                queryKey: ['activities'] 
            });
            // This will refetch the activities after a successful update
        }
    })


    return { activities, isPending, updateActivity, createActivity, deleteActivity }; 

}