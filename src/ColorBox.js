import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import './ColorBox.css';
import styled from '@emotion/styled';

const Colorbox = styled.div`
    width: 20%;
    height: 25%;
    margin: 0 auto;
    display: inline-block;
    position: relative;
    cursor: pointer;
    margin-bottom: -4px;
    &:hover {
        button {
            opacity: 1;
        }
    }
`

export default function ColorBox(props) {
    const [copied, setCopied] = useState(false);
    const { name, id, background, more } = props;
    const lightText = chroma(background).luminance() <= 0.08 ? 'white' : 'rgba(0,0,0,0.6)';
    const darkText = chroma(background).luminance() >= 0.6 ? 'rgba(0,0,0,0.6)' : 'white';

    function changeCopyState() {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    }

    const Copybutton = styled.button`
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
        color: ${darkText};
        text-transform: uppercase;
        transition: 0.5s;
        opacity: 0;
    `

    const Seemore = styled.div`
        position: absolute;
        border: none;
        bottom: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.3);
        color: ${darkText};
        width: 60px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        text-transform: uppercase;
    `

    const BoxContent = styled.div`
        position: absolute;
        width: 100%;
        left: 0px;
        bottom: 0px;
        padding: 10px;
        color: black;
        letter-spacing: 1px;
        text-transform: uppercase;
    `

    return (
        <CopyToClipboard text={background} onCopy={changeCopyState}>
            <Colorbox style={{ background, height: (more ? '50%' : '25%') }} >
                {/*the ${copied && 'show'} checks to see if the state of copied is 'true', if it is, then it adds the class 'show'*/}
                <div style={{ background }} className={`copy-overlay ${copied && 'show'}`} />
                {/* message that displays on overlay showing 'copied' and color code */}
                <div className={`copy-msg ${copied && 'show'}`}>
                    <h1>copied!</h1>
                    <p style={{ color: lightText }}>{background}</p>
                </div>

                <div>
                    <BoxContent>
                        <span style={{ color: lightText }}>{name}</span>
                    </BoxContent>
                    <Copybutton>Copy</Copybutton>
                </div>
                {!more && (
                    <Link to={`${id}`}>
                        <Seemore onClick={e => e.stopPropagation}>More</Seemore>
                    </Link>
                )}

            </Colorbox>
        </CopyToClipboard>
    );
}