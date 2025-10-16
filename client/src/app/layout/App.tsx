import { CssBaseline, Container, Box } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";

function App() {

const location = useLocation(); 

  return (

    <Box sx={{backgroundColor: '#eeeeee', minHeight: '100vh'}}>
    <CssBaseline />
    {location.pathname === '/' ? <HomePage/> : (
      <>
        <NavBar />
        <Container maxWidth='xl'sx={{mt: 3}}>
          <Outlet />
        </Container>
      </>
    )}  
    </Box>
 
  )
}

export default App



/* 

This component is the MAIN LAYOUT (shell) for the entire application.

It no longer fetches data or passes props. Instead, it defines the structure that wraps around all routed pages.

<Outlet /> is where the current page/component (based on the URL route) will be rendered. So instead of manually rendering something like 
<ActivityDashboard />, React Router decides what goes here. What happens is <Outlet /> is replaced with the component for the matched route.

Think of App.tsx as the master layout or template (like a shared index.html or _Layout.cshtml). It's the “parent” that all routed pages sit inside.

*/ 