/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DraggableColorList from './DraggableColorList';
import arrayMove from 'array-move';
import { css } from '@emotion/react';

import { ValidatorForm } from 'react-material-ui-form-validator';

import NewPaletteFormNav from './NewPaletteFormNav';
import ColorPickerForm from './ColorPickerForm';

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        height: 'calc(100vh - 64px)',
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function NewPaletteForm(props) {
    const theme = useTheme();
    const navigate = useNavigate();
    const maxColors = 20;
    const [open, setOpen] = React.useState(false);
    const [currColor, setCurrColor] = useState('purple');
    const [currEmoji, setCurrEmoji] = useState('');
    const [myColors, setMyColors] = useState(props.palettes[0].colors);
    const [newColorName, setNewColorName] = useState('');
    const [newPaletteName, setNewPaletteName] = useState('');
    const paletteFull = myColors.length >= maxColors;

    // styles for the ColorPicker object
    const npfContainer = css`
        width: 90%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .npfHeading{
            text-align: center;
            font-size: 2rem;
        }
        .npfButtons {
            width: 100%;
            .npfButton {
                width: 50%;
                margin: 0;
            }
        }
    `
    // functionalcomponent/hook version of component did mount, this adds new validationcheck for textvalidator that compares the current name against all
    // existing names in the myColors array, as well as current colour
    useEffect(() => {
        ValidatorForm.addValidationRule('isColorNameUnique', value =>
            myColors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', value =>
            myColors.every(
                ({ color }) => color !== currColor
            )
        );
        ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
            props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    });

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // adds new colorBoxes by duplicating the array, then adding the new color and its name, then resets the value of colorName
    function addNewColor() {
        setMyColors(arr => [...arr, { color: currColor, name: newColorName }], setNewColorName(''));
    };

    // handles change by checking to see which field is being typed in and then changing the appropriate state
    function handleChange(evt) {
        if (evt.target.name === 'newColorName') {
            setNewColorName(evt.target.value);
        } else if (evt.target.name === 'newPaletteName') {
            setNewPaletteName(evt.target.value);
        }
    }

    // for the sortable-hoc, takes existing array, sorts, then updates array
    const onSortEnd = ({ oldIndex, newIndex }) => {
        setMyColors(arrayMove(myColors, oldIndex, newIndex))
    };

    // deletes colorBoxes, calls the useState function, then has the array duplicate itself, but also filter itself for colors that do NOT match the color name given
    function deleteColorBox(colorName) {
        setMyColors(arr => [...arr.filter(color => color.name !== colorName)])
    }

    // creates a newPalette using the name given, generates an ID based on the name, passes it to home, then redirects
    function handleSubmit() {
        const newPalette = { paletteName: newPaletteName, id: newPaletteName.toLowerCase().replace(/ /g, "-"), emoji: currEmoji, colors: myColors };
        props.savePalette(newPalette);
        navigate('/');
    }

    // erases all colorboxes
    function clearColors() {
        setMyColors([]);
    }

    // picks random colour from existing palettes
    function addRandomColor() {
        // combines all colours from each array and then FLATTENS them into a single array
        const allColors = props.palettes.map(p => p.colors).flat();
        var rand = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[rand];
        setMyColors(arr => [...arr, { color: randomColor.color, name: randomColor.name }])
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <NewPaletteFormNav
                open={open}
                newPaletteName={newPaletteName}
                handleDrawerOpen={handleDrawerOpen}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                setCurrEmoji={setCurrEmoji}
            />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center'
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <div css={npfContainer}>
                    <Typography variant='h4' className='npfHeading' gutterBottom>Design Your Palette</Typography>
                    <Stack direction='row' spacing={2} className='npfButtons'>
                        <Button variant='contained' color='error' onClick={clearColors} className='npfButton'>Clear Palette</Button>
                        <Button variant='contained' color='primary' onClick={addRandomColor} className='npfButton' disabled={paletteFull}>Random Colour</Button>
                    </Stack>
                    <ColorPickerForm
                        paletteFull={paletteFull}
                        currColor={currColor}
                        setCurrColor={setCurrColor}
                        addNewColor={addNewColor}
                        newColorName={newColorName}
                        handleChange={handleChange}
                    />
                </div>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <DraggableColorList colors={myColors} deleteColorBox={deleteColorBox} onSortEnd={onSortEnd} axis='xy' />
            </Main>
        </Box>
    );
}