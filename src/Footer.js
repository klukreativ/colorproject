import styled from '@emotion/styled';

export default function Footer (props) {
    const Footer = styled.footer`
        background-color: white;
        height: 5vh;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-weight: bold;
        & > span {
            font-size: 1.5rem;
            margin: 0 1rem;
        }
    `
        return (
            <Footer>
                {props.paletteName}
                <span className='emoji'>{props.emoji}</span>
            </Footer>
        )
    }