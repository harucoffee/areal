import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, SwipeableDrawer, Button, Box } from '@mui/material';
import { Home } from '@mui/icons-material';

type Anchor = 'right'

export default function Drawer() {
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = 
    (anchor: Anchor, open : boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setState({ ...state, [anchor]: open});
    };

    const list = (anchor: Anchor) => (
        <Box onClick={toggleDrawer(anchor, false)}>
        <List>
            {['Home', 'Contact'].map((text, index) => (

                <ListItem key={text} disablePadding>
                    <ListItemButton>
                        <ListItemText primary={text}/>
                        </ListItemButton>
                </ListItem>
    
            ))}
        </List>
        </Box>
    );
    
    return (
        <div>

    
        {(['right'] as const).map((anchor) => (
            <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                    {list(anchor)}
                 </SwipeableDrawer>
            </React.Fragment>
        ))}
        </div>
    )


}








