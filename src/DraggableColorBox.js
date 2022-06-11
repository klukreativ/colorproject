/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import { SortableElement } from 'react-sortable-hoc'

const DraggableColorBox = SortableElement((props) => {
    // using string style b/c sortable elements are not interacting well w/ styled components
    const dcb = css`
    background-color: ${props.color};
    width:20%;
    height:25%;
    margin: 0 auto;
    display: inline-block;
    position: relative;
    cursor: pointer;
    margin-bottom: -7px;
    &:hover svg {
        color: white;
        transform: scale(1.5);
    }
    .deleteIcon{
        color: rgba(0,0,0,0.5);
        transition: all 0.3s ease-in-out;
        z-index: 5;
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
        display: flex;
        justify-content: space-between;
    `

    return (
        <div css={dcb}>
            <BoxContent>
                <span>{props.name}</span>
                <DeleteIcon className='deleteIcon' onPointerDown={() => props.deleteColorBox(props.name)} />
            </BoxContent>
        </div>
    )
})

export default DraggableColorBox;