import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetail from "../../features/activities/details/ActivityDetail";

// Define the routes for the application
// The main route '/' uses the App component which contains a NavBar and an Outlet for nested routes
// Nested routes include the HomePage at '/', ActivityDashboard at '/activities', and ActivityForm at '/createActivity'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: 'activities', element: <ActivityDashboard /> },
            { path: 'activities/:id', element: <ActivityDetail /> },
            { path: 'createActivity', element: <ActivityForm key='create' /> },
            { path: 'manage/:id', element: <ActivityForm /> }
        ]
    }
])


/* 

Notes:

1. This sets up **SPA routing** using React Router v6's `createBrowserRouter`.
   Instead of manually showing components based on URL, React Router handles it
   automatically and renders them into <Outlet /> inside App.tsx.

2. The `children` array defines **nested routes**.
   All of these pages are wrapped by <App />, so NavBar and styling stay consistent.

3. Dynamic routes (like `activities/:id` and `manage/:id`) allow you to
   capture parameters from the URL (like the activity ID) for fetching or editing data.

4. The `key='create'` on `ActivityForm` for `createActivity` is important:
   - React uses keys to decide whether to **reuse** or **replace** a component.
   - Without the key, navigating from editing to creating might reuse the old form state.
   - By adding a unique key, React will unmount the old form and mount a fresh one
     when switching between create and edit.

5. This setup means we no longer have to manually load pages in App.tsx.
   Just change the URL, and React Router handles which component shows in <Outlet />.

*/