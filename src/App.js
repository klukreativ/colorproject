import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Palette from './Palette';
import NewPaletteForm from './NewPaletteForm';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import seedColors from './seedColors';

export default function App() {
  const [palettes, setPalettes] = useState(seedColors);

  function savePalette(newPalette) {
    setPalettes(arr => [...arr, newPalette]);
  }

  function deletePalette() {
    console.log('CLicked!')
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<PaletteList palettes={palettes} />} />
        <Route path='/palette/new' element={<NewPaletteForm palettes={palettes} savePalette={savePalette} deletePalette={deletePalette} />} />
        <Route path='/palette/:paletteId' element={<Palette palettes={palettes} />} />
        <Route path='/palette/:paletteId/:colorId' element={<SingleColorPalette palettes={palettes} />} />
      </Routes>
    </div>
  );
}