import {css} from '@emotion/react';
import styled from '@emotion/styled';

export default function MiniPalette(props) {
    const Root = styled.div`
        background-color:white;
        border-radius:5px;
        border: 1px solid black;
        padding:0.5rem;
        position:relative;
        overflow:hidden;
        &:hover {cursor:pointer;}
            & > div {
                background-color:grey;   
                height:150px;
                width:100%;     
                border-radius: 5px;
                overflow: hidden;
            }
            & > h5{
                display:flex;
                justify-content: space-between;
                align-items: center;
                margin: 0;
                color: black;
                padding-top: 0.5rem;
                font-size: 1rem;
                position: relative;
                & > span {
                    margin-left: 0.5rem;
                    font-size: 1.5rem;
                }
            }
    `
    const dynamicColor = props =>
    css`
      background-color: ${props.color};
    `
    const MiniColor = styled.div`
            height: 25%;
            width: 20%;
            display: inline-block;
            margin: 0 auto;
            position: relative;
            margin-bottom: -4px;
            ${dynamicColor};
    `
    
    const { paletteName, emoji, colors } = props.palette;
    const miniColorBoxes = colors.map(color => (
        <MiniColor color={color.color} key={color.name} />
    ))

    return (
        <Root onClick={props.goToPalette}>
            <div>
                {miniColorBoxes}
            </div>
            <h5>{paletteName}<span>{emoji}</span></h5>
        </Root>
    )
}