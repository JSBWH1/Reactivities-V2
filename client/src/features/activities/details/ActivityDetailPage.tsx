import { Typography, Grid2 } from "@mui/material";
import { useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

export default function ActivityDetailPage() {

    const {id} = useParams();
    // useParams is a hook from react-router that allows us to access the parameters in the URL (in this case, the id of the activity). We do have to destructure it from the object that useParams returns
    const {activity, isLoadingActivity} = useActivities(id);
    // Here we are passing the id from the URL to the useActivities hook to get the specific activity details. We also destructure isLoadingActivity to handle the loading state.

    if (isLoadingActivity) return <Typography>Loading...</Typography>;
    if (!activity) return <Typography>Activity not found</Typography>;

  return (
    <Grid2 container spacing={3}>
        <Grid2 size={8}>
            <ActivityDetailsHeader activity={activity} />
            <ActivityDetailsInfo activity={activity} />
            <ActivityDetailsChat />
        </Grid2>
        <Grid2 size={4}>
            <ActivityDetailsSidebar />
        </Grid2>
    </Grid2>
  )
}
