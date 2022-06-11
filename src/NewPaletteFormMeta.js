import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EmojiPicker from './EmojiPicker';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function NewPaletteFormMeta(props) {
    // imports these controls to manipulate the dialog & submit form from parent
    const { handleSubmit, handleChange, newPaletteName, handleClose, open } = props;
    const [stage, setStage] = useState('form')

    function showEmojiPicker() {
        setStage('emoji')
    }

    function saveEmoji(emoji) {
        props.setCurrEmoji(emoji.native);
    }

    function handleCancel() {
        setStage('form')
    }

    return (
        <div>
            <Dialog open={open && stage === 'emoji'} onClose={handleClose}>
                <DialogTitle>Choose an Emoji</DialogTitle>
                <EmojiPicker onEmojiSelect={saveEmoji} />
                <DialogActions>
                    <Button onClick={handleCancel}>
                        Go Back
                    </Button>
                    <Button variant='contained' onClick={handleSubmit}>
                        Save Palette
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open && stage === 'form'} onClose={handleClose}>
                <DialogTitle>Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={showEmojiPicker}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your new palette.
                        </DialogContentText>

                        <TextValidator
                            label='Palette Name'
                            value={newPaletteName}
                            name='newPaletteName'
                            variant='standard'
                            fullWidth
                            margin='normal'
                            onChange={handleChange}
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={['Enter Palette Name', 'Name Already in Use']}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant='contained' color='primary' type='submit'>Next</Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    );
}