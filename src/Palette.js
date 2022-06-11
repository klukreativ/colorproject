import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import Footer from './Footer';
import './Palette.css';
import { generatePalette } from './colorHelpers'

export default function Palette(props) {
    // initializes the variables using state
    const [level, setLevel] = useState(500);
    const [format, setFormat] = useState('hex');
    // obtains paletteId from URL to load the appropriate palette
    const params = useParams();
    const paletteId = (params.paletteId);

    // functions to pass to Navbar
    function changeLevel(level) {
        setLevel(level);
    }
    function changeFormat(newFormat) {
        setFormat(newFormat);
    }

    // uses params to search through seedColors array to find the relevant palette by matching query w/palette.id
    function findPalette(id) {
        return props.palettes.find(function (palette) {
            return palette.id === id;
        })
    }   

    const palette = generatePalette(findPalette(paletteId));
    const { colors, paletteName, emoji } = palette;
    const colorBoxes = colors[level].map((color) => (
        <ColorBox background={color[format]} name={color.name} id={color.id} key={color.id} />
    ))

    return (
        <div className='Palette'>
            <Navbar level={level} changeLevel={changeLevel} handleChange={changeFormat} />
            <div className='Palette-colors'>
                {colorBoxes}
            </div>
            <Footer paletteName={paletteName} emoji={emoji} />
        </div>
    )
}