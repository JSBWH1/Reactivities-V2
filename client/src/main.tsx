import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router';
import { router } from './app/router/Routes.tsx';
import { store, StoreContext } from './lib/stores/store.ts';
import { ToastContainer } from 'react-toastify'; 

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
        <RouterProvider router={router} />
      </QueryClientProvider>  
    </StoreContext.Provider>
  </StrictMode>,
)


/* 

We can see JavaScript code above document.getElementById('')

This basically calls in our application with the id of 'root' 

createRoot() is react functionality. 

.render() effectively renders our react application.

In this case, our react application starts in 'Strict' mode and then renders our app component. 

This page essentially is the entry point for our react application. Its role is to render our app component.



-- eventually the app component will be replaced with a router component to allow for multiple pages. so instead of <App />, we will have <RouterProvider routeer={router} />
-- This is because we will be using react-router-dom to manage multiple pages in our application. 
-- The goal is that the router provider will provide an outlet for our app component to be rendered in. (so in our app component we will have an <Outlet /> component where the app component will be rendered.)
-- The outlet component is a placeholder that will be filled with the app component when the route is matched. Example, if the user tries to load up the page to see their own user profile, the router will match the route and render the app component in the outlet.


*/ 