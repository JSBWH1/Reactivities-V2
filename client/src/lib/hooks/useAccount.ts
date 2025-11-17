import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import agent from "../api/agent";
import type { LoginSchema } from "../schemas/loginSchema";
import type { User } from "../types";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import type { RegisterSchema } from "../schemas/registerSchema";

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();


    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post('/login?useCookies=true', creds);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user']
            }); 
        }
    });


    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post('/account/register', creds);
        },
        onSuccess: () => {
            toast.success('Register successful - you can now login'); 
            navigate('/login');
        }
    })


    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout');    
        },
        onSuccess: () => {
            queryClient.removeQueries({queryKey: ['user']})
            queryClient.removeQueries({queryKey: ['activities']})
            navigate('/');
        }
    })


    const {data: currentUser, isLoading: loadingUserInfo} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            
            const response = await agent.get<User>('/account/user-info');
            return response.data;
        },
        enabled: !queryClient.getQueryData(['user']) 
            && location.pathname !== '/login' 
            && location.pathname !== '/register'
            // Only fetch user info if not already in cache and not on login/register page (no need to fetch if logging in or registering)
            // It will be fetched after login/register mutations anyway
    })

    return {
        loginUser,
        currentUser,
        logoutUser,
        loadingUserInfo,
        registerUser
    }

}