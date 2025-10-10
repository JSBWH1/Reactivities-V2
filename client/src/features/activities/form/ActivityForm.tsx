import { Paper, Typography, Box, TextField, Button } from "@mui/material";
import type { FormEvent } from "react";

type Props = {   
    activity?: Activity; // activity is optional because when creating a new activity there is no existing activity to pass in
    closeForm: () => void;
    submitForm: (activity: Activity) => void;
}

export default function ActivityForm({activity, closeForm, submitForm}: Props) {

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data: {[key: string]: FormDataEntryValue} = {}
        formData.forEach((value, key) => {
            data[key] = value;
        });

        if(activity) data.id = activity.id; // if we are editing an existing activity we need to keep the id the same
        
        submitForm(data as unknown as Activity);
    }

  return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
        <Typography variant="h5" gutterBottom color="primary">
            Create Activity
        </Typography>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
            <TextField name="title" label="title" defaultValue={activity?.title} />
            <TextField name="description" label="Description" defaultValue={activity?.description} multiline rows={3} />
            <TextField name="category" label="Category" defaultValue={activity?.category} />
            <TextField name="date" label="Date" defaultValue={activity?.date} type="date" />
            <TextField name="city" label="City" defaultValue={activity?.city} />
            <TextField name="venue" label="Venue" defaultValue={activity?.venue} />
            <Box display="flex" justifyContent="end" gap={3}>
                <Button onClick={closeForm} color="inherit">Cancel</Button>
                <Button type="submit" color="success" variant="contained">Submit</Button>
            </Box>
        </Box>
        
    </Paper>
  )
}
