import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";


export default function ActivityDetails() {

    const navigate = useNavigate();
    const {id} = useParams();
    // useParams is a hook from react-router that allows us to access the parameters in the URL (in this case, the id of the activity). We do have to destructure it from the object that useParams returns
    const {activity, isLoadingActivity} = useActivities(id);
    // Here we are passing the id from the URL to the useActivities hook to get the specific activity details. We also destructure isLoadingActivity to handle the loading state.

    if (isLoadingActivity) return <Typography>Loading...</Typography>;
    if (!activity) return <Typography>Activity not found</Typography>;

  return (
    <Card sx={{borderRadius: 3}}>
        <CardMedia 
            component="img" 
            src={`/images/categoryImages/${activity.category}.jpg`}
        />
        <CardContent>
            <Typography variant="h5">{activity.title}</Typography>
            <Typography variant="subtitle1" fontWeight="light">{activity.date}</Typography>
            <Typography variant="body1">{activity.description}</Typography>
        </CardContent>
        <CardActions>
            <Button component={Link} to={`/manage/${activity.id}`} color="primary">Edit</Button>
            <Button onClick={() => navigate('/activities')} color="inherit">Cancel</Button>
        </CardActions>
    </Card>
  )
}
