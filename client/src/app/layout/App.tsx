import { CssBaseline, Container, Box } from "@mui/material";
import { useEffect, useState } from "react"
import axios from "axios";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {

  const [activities, setActivities] = useState<Activity[]>([]); 
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
    .then(response => setActivities(response.data))
  }, [])

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id));
  }; 

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }; 

  const handleOpenForm = (id?: string) => {
    if(id) handleSelectActivity(id);
    // stores the selected activity in state if there is an id. This is for editing an existing activity
    else handleCancelSelectActivity();
    // if there is no id we are creating a new activity so we clear the selected activity (hence not passing an id as a parameter)
    setEditMode(true);
    // open the form to create or edit an activity  
  }

  const handleFormClose = () => {
    setEditMode(false);
    // close the form
  }

  const handleSubmitForm = (activity: Activity) => {
    if(activity.id) {
        setActivities(activities.map(x => x.id === activity.id ? activity : x))
    } else {
        const newActivity = {... activity, id: activities.length.toString()}; 
        setSelectedActivity(newActivity);
        setActivities([...activities, newActivity]); 
    }
    // This function handles both creating a new activity and editing an existing activity. it checks if the activity has an id. If it does, it updates the existing activity in the activities array. If it doesn't, it creates a new activity and adds it to the activities array.
    
    setEditMode(false); // closes the form after submitting
  }


  const handleDelete = (id: string) => {
    setActivities(activities.filter(x => x.id !== id));
  }


  return (

    <Box sx={{backgroundColor: '#eeeeee'}}>
    <CssBaseline />
       <NavBar openForm={handleOpenForm} />
       <Container maxWidth='xl'sx={{marginTop: 3}}>
        <ActivityDashboard 
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
          submitForm={handleSubmitForm}
          deleteActivity={handleDelete}
        />
       </Container>
    </Box>
 
  )
}

export default App



// this is the main layout component that wraps around the entire application
// this is why we are using the UseEffect and Axios here to load the activities from the API
// so that we only load them once when the application starts
// and then we pass the activities down to the ActivityDashboard component as a prop
// we also use the CssBaseline component from MUI to reset the CSS styles
// and the Container component to center the content and give it a max width
// we use the Box component to give the background color to the entire application. We could also use <> and </> instead of Box but then we would have to use a CSS file to give the background color
// think of this file (App.tsx) as the index.html file in a regular web application or the parent component that wraps around all other components. Essentially the Daddy component.
// we use the sx prop to style the components using the MUI system. This allows us to use a JavaScript object to define the styles instead of using a CSS file. This is a powerful feature of MUI that allows us to use JavaScript to define our styles and also to use theme values in our styles.