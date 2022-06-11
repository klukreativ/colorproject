import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

export default function Navbar(props) {
    const navigate = useNavigate();
    const [format, setFormat] = useState('hex');
    const [open, setOpen] = useState(false);
    const [level, setLevel] = useState(props.level);

    // changes format, but also open status to true triggering snackbar notification, also passes change to parent (Palette)
    function handleFormatChange(e) {
        setFormat(e.target.value);
        setOpen(true);
        props.handleChange(e.target.value);
    }
    function closeSnackbar() {
        setOpen(false);
    }

    const handleLevel = newlevel => {
        setLevel(newlevel);
        props.changeLevel(newlevel);
    }

    return (
        <header className='Navbar'>
            <div className='logo' onClick={() => navigate('/')}>
                reactcolorpicker
            </div>
            {!props.more && (
                <div className='slider-container'>
                    <span>Level: {level}</span>
                    <div className='slider'>
                        {/*initializes Slider, defaulting to state, and adjusting min/max/steps, and on change it will call func changeLevel */}
                        <Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={handleLevel} />
                    </div>
                </div>
            )}

            <div className='select-container'>
                {/* dropdown menu that will change the color format */}
                <Select value={format} onChange={handleFormatChange}>
                    <MenuItem value='hex'>HEX - #FFFFFF</MenuItem>
                    <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
                    <MenuItem value='rgba'>RGBA - rgba(255,255,255,1)</MenuItem>
                </Select>
            </div>
            {/* creates an overlay whenever color format is changed */}
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={open}
                autoHideDuration={3000}
                message={<span id='message-id'>Format Changed to {format.toUpperCase()}!</span>}
                ContentProps={{ 'aria-describedby': 'message-id' }}
                action={[
                    <IconButton onClick={closeSnackbar} color='inherit' key='close' aria-label='close'>
                        <CloseIcon />
                    </IconButton>
                ]}
                onClose={closeSnackbar}
            />
        </header>
    )
}