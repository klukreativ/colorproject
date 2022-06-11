import { useParams } from 'react-router-dom';

export function PaletteFinder() {
    let params = useParams();
    const paletteId = parseInt(params.paletteId, 10);
    return (
        { paletteId }
    )
}