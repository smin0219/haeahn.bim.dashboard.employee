import React ,{useEffect, useState} from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/system';
import Moment from 'moment';
const onDateChange = (e) => {
    console.log(e);
}

function MuiDatePicker(props){
    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                value={props.date}
                onChange={(newValue) => {
                    props.setDate(Moment(newValue).format('YYYY-MM-DD'));
                    props.setIsDateUpdated(true);
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