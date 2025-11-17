import { useAccount }  from "../../lib/hooks/useAccount";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Paper, Typography, Button } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { Link } from "react-router";
import { type RegisterSchema, registerSchema } from "../../lib/schemas/registerSchema";


export default function RegisterForm() {

    const {registerUser} = useAccount();

    const {control, handleSubmit, setError, formState: { isValid, isSubmitting }} = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema),
    });


    const onSubmit = async (data: RegisterSchema) => {
            await registerUser.mutateAsync(data, {
                onError: (error) => {
                    if (Array.isArray(error)) {
                        error.forEach(err => {
                            if (err.includes('Email')) setError('email', {message: err})
                            else if (err.includes('Password')) setError('password', {message: err})
                        /* 
                            Uses setError from react-hook-form to set field-specific errors. So any errors from our API get displayed next to the right form field.
                            If the error array contains messages related to 'Email' or 'Password', it sets those errors on the respective fields.
                            Doing it this way integrates server-side validation errors into the client-side form validation seamlessly 
                                without extra state management and the need to build custom error displays.
                        */ 
                       })
                    }
                }
            }); 
    }

  return (
    <Paper 
        component='form' 
        onSubmit={handleSubmit(onSubmit)} 
        sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 3,
            gap: 3,
            maxWidth: 'md',
            mx: 'auto',
            borderRadius: 3
        }}>
            <Box display='flex' alignItems='center' justifyContent='center' gap={3} color='secondary.main'>
                <LockOpen fontSize='large' />
                <Typography variant="h4">Register</Typography>
            </Box>
            <TextInput label='Email' control={control} name='email' />
            <TextInput label='Display name' control={control} name='displayName' />
            <TextInput label='Password' type='password' control={control} name='password' />
            <Button 
                type='submit' 
                disabled={!isValid || isSubmitting}
                variant='contained'
                size='large'
            >
                Register 
            </Button>
            <Typography sx={{textAlign: 'center'}}>
                Already have an account? 
                <Typography sx={{ml:2}} component={Link} to='/login' color='primary'>
                    Sign in 
                </Typography>
            </Typography>
    </Paper>
  )
}
