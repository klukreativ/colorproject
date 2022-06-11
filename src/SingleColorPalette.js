import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ColorBox from './ColorBox';
import { generatePalette } from './colorHelpers'
import './SingleColorPalette.css'
import styled from '@emotion/styled';

export default function SingleColorPalette(props) {
    const [format, setFormat] = useState('hex');
    const params = useParams();
    const paletteId = params.paletteId;
    const colorId = params.colorId;

    const Backbox = styled.div`
    background: black;
    width: 20%;
    height: 50%;
    margin: 0 auto;
    display: inline-block;
    position: relative;
    cursor: pointer;
    margin-bottom: -4px;
    .back-button {
        width: 100px;
        height: 30px;
        position: absolute;
        display: inline-block;
        top: 50%;
        left: 50%;
        margin-left: -50px;
        margin-top: -15px;
        text-align: center;
        outline: none;
        border: none;
        background: rgba(255, 255, 255, 0.3);
        font-size: 1rem;
        line-height: 30px;
        color: white;
        text-transform: uppercase;
        transition: 0.5s;
        text-decoration: none;
    }
    `

    function changeFormat(newFormat) {
        setFormat(newFormat);
    }

    function findPalette(id) {
        return props.palettes.find(function (palette) {
            return palette.id === id;
        })
    }

    function findColor(palette, id) {
        let colorSpectrum = [];
        const allColors = palette.colors;

        for (let key in allColors) {
            colorSpectrum = colorSpectrum.concat(
                allColors[key].filter(color => color.id === id)
            )
        }
        return colorSpectrum.slice(1);
    }

    const palette = generatePalette(findPalette(paletteId));
    const { paletteName, emoji } = palette;
    const colors = findColor(palette, colorId)

    const colorBoxes = colors.map((color) => (
        <ColorBox background={color[format]} name={color.name.replace(color.id, '')} id={color.id} key={color.name} more={true} />
    ))

    return (
        <div class='SingleColorPalette'>
            <Navbar handleChange={changeFormat} more={true} />
            <div class='SingleColorPalette-inner'>
                {colorBoxes}
                <Backbox>
                    <Link to={`/palette/${paletteId}`} className='back-button'>Go Back</Link>
                </Backbox>
            </div>
            <Footer paletteName={paletteName} emoji={emoji} />
        </div>
    )
}