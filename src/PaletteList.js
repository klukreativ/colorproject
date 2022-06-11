import { Link, useNavigate } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import styled from '@emotion/styled';

const Root = styled.div`
    background-color: blue;
    height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
`

const Container = styled.div`
    width: 50%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
    & > nav {
        display: flex;
        width: 100%;
        justify-content: space-between;
        color: white;
        align-items: center;
        & > a {
            color: white;
            text-decoration: none;
        }
    }
`

const Palettes = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: repeat( 3, 30%);
    grid-gap: 5%;
`

export default function PaletteList(props) {
    const navigate = useNavigate();
    const goToPalette = (id) => {
        navigate(`/palette/${id}`)
    }

    const palettes = props.palettes.map(palette => (
        <div key={palette.id}>
            <MiniPalette palette={palette} key={palette.id} goToPalette={() => goToPalette(palette.id)} />
        </div>
    ))

    return (
        <Root>
            <Container>
                <nav>
                    <h1>React Colours</h1>
                    <Link to='/palette/new'>Create Palette List</Link>
                </nav>

                <Palettes>
                    {palettes}
                </Palettes>
            </Container>
        </Root>
    )
}