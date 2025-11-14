import type { TextFieldProps} from "@mui/material";
import { TextField } from "@mui/material";
import { useController } from "react-hook-form"
import type { FieldValues, UseControllerProps } from "react-hook-form"

type Props<T extends FieldValues> = {} & UseControllerProps<T> & TextFieldProps


export default function TextInput<T extends FieldValues>(props: Props<T>) {

const {field, fieldState} = useController({... props}); 

  return (
    <TextField 
        {...props}
        {...field}
        value={field.value || ""}
        fullWidth
        variant="outlined"
        error={!!fieldState.error}
        helperText={fieldState.error?.message}    
    />
  )
}



// This file is to create a re-usable text field. We pass the relevant data to this file using props. We then populate the fields and send it back to the required file. 
// This way we do not have to retype the <TextField properties over and over. 


// Please see ActivityForm to see this in use.