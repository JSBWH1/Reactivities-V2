import axios from "axios"; 

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}


const agent = axios .create({
    baseURL: import.meta.env.VITE_API_URL
    // Grabs our base URL from the environment variable we set up in the .env.development file
    // this way we don't have to hardcode the base URL here, making it easier to change if needed
}); 


agent.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    }
        catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
});

export default agent;




/* 

This file sets up an axios instance with a base URL and a response interceptor that adds a delay to simulate network latency. 
The agent can be used throughout the application to make API requests.

*/ 
