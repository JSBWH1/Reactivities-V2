import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent"; // our axios instance (instead of writing axios.get followed by a full http address, we can just write agent.get followed by the endpoint we want to access)
import { useLocation } from "react-router";


export const useActivities = (id?: string) => {
    // Custom hook to manage activities
    // have to use ? on the id parameter to make it optional, otherwise we get an error when we try to use this hook in components that don't pass an id (like ActivityDashboard)

    const queryClient = useQueryClient();
    const location = useLocation();

    const {data: activities, isPending} = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<Activity[]>('/activities');
            return response.data;
        },
        enabled: !id && location.pathname === '/activities'
    });
    
    const {data: activity, isLoading: isLoadingActivity } = useQuery({
        queryKey: ['activities', id],
        queryFn: async () => {
            const response = await agent.get<Activity>(`/activities/${id}`);
            return response.data;
        },
        enabled: !!id // only run this query if id is truthy (i.e., not null or undefined). Basically, if we have an id, then run this query, otherwise don't
        // essentially, putting this here stops this query from running when we don't have an id (like in ActivityDashboard component)
    }) 


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
            const response = await agent.post('/activities', activity)
            return response.data; 
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


    return { activities, isPending, updateActivity, createActivity, deleteActivity, activity, isLoadingActivity }; 

}