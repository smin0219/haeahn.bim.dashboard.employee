import React ,{useEffect, useState} from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import styles from './mui-date-picker.module.css';

const onDateChange = (e) => {
    console.log(e);
}

function MuiDatePicker(props){
    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                value={props.date}
                onChange={(newValue) => {
                    props.setDate(newValue);
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '30px', paddingTop: '41px'}}>
                        <input ref={inputRef} {...inputProps} />
                        {InputProps?.endAdornment}
                    </Box>
                )}
            />
        </LocalizationProvider>
    );
}

export default MuiDatePicker;