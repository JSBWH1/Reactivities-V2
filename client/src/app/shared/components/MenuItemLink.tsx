import { MenuItem } from "@mui/material";
import type { ReactNode } from "react";
import { NavLink } from "react-router";


export default function MenuItemLink({children,  to}: {children: ReactNode, to: string}) {
  return (
    <MenuItem
        component={NavLink}
        to={to}
        sx={{
            fontSize: '1.2rem', 
            textTransform: 'uppercase', 
            fontWeight: 'bold',
            color: 'inherit',
            '&.active': {
                color: 'yellow'
            }
        }}
    >
        {children}
    </MenuItem>
  )
}

/*

This page creates a reusable MenuItemLink component that combines MUI's MenuItem with React Router's NavLink. 
It accepts children (the link text) and a to prop (the target route). 
The component applies custom styles, including an active state style that changes the text color when the link is active.

We can import and use this MenuItemLink component in our NavBar to create navigation links with consistent styling and active state handling.
-- See <NavBar.tsx> for usage. Look for the tag <MenuItemLink>.

You will notice we need the 'to' prop in the MenuItemLink component. This is because we are not passing the 'to' prop down from the NavBar component to the MenuItemLink component.
Instead, we are using the 'to' prop directly in the MenuItemLink component. This is because we are using the 'to' prop in the NavLink component, which is a child of the MenuItemLink component.

*/
