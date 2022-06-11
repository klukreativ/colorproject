/** @jsxImportSource @emotion/react */
import Button from '@mui/material/Button';
import { css } from '@emotion/react';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';

export default function ColorPickerForm(props) {
    const { paletteFull, currColor, setCurrColor, addNewColor, newColorName, handleChange } = props;
    const cpfRoot = css`
    width: 100%;
        .picker {
            width: 100% !important;
            margin-top: 2rem;
        }
        .addColor{
            width: 100%;
            padding: 1rem;
            margin-top: 1rem;
            font-size: 2rem;
        }
        .colorNameInput{
            width: 100%;
            height: 70px;
        }
    `
    return (
        <div css={cpfRoot}>
            <ChromePicker color={currColor} onChangeComplete={(newColor) => setCurrColor(newColor.hex)} className='picker' />
            <ValidatorForm onSubmit={addNewColor}>
                <TextValidator
                    value={newColorName}
                    name='newColorName'
                    className='colorNameInput'
                    variant='filled'
                    margin='normal'
                    placeholder='Color Name'
                    onChange={handleChange}
                    validators={['required', 'isColorNameUnique', 'isColorUnique']}
                    errorMessages={['Enter a color name.', 'Color name must be unique.', 'Color must be unique.']}
                />
                <Button variant='contained' style={{ backgroundColor: paletteFull ? 'grey' : currColor }} type='submit' disabled={paletteFull} className='addColor'>
                    {paletteFull ? 'Palette Full' : 'Add Color'}
                </Button>
            </ValidatorForm>
        </div>
    )
}