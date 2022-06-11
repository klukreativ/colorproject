/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { css } from '@emotion/react';

import NewPaletteFormMeta from './NewPaletteFormMeta';

const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function NewPaletteFormNav(props) {
    const { open, newPaletteName, handleDrawerOpen, handleSubmit, handleChange } = props;
    const [formShowing, setFormShowing] = useState(false);

    // these functions control the dialog form for palette name
    function showForm() {
        setFormShowing(true);
    }
    function hideForm() {
        setFormShowing(false);
    }

    const root = css`
        display: flex;
        .appBar {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            height: 64px;
        }
        .navBtns {
            margin-right: 1rem;
            & > a {
                text-decoration: none;
            }
            & > button {
                margin: 0 0.5rem;
            }
        }
    `

    return (
        <div css={root}>
            <CssBaseline />
            <AppBar position="fixed" open={open} color='default' className='appBar' >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Create a Palette
                    </Typography>
                </Toolbar>
                <div className='navBtns'>
                    <Link to='/'>
                        <Button variant='contained' color='secondary'>Go Back</Button>
                    </Link>
                    <Button variant='contained' color='primary' onClick={showForm}>
                        Save
                    </Button>
                </div>
            </AppBar>
            {/* this checks if the formshowing var is true (button pressed) before displaying the dialog form */}
            {formShowing &&
                <NewPaletteFormMeta
                    newPaletteName={newPaletteName}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleClose={hideForm}
                    open={formShowing}
                    setCurrEmoji={props.setCurrEmoji}
                />}
        </div>
    )
}