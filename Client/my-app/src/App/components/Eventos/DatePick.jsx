import React, { useState, useEffect } from 'react';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
// pick a date util library
// import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
// import LuxonUtils from '@date-io/luxon';

function DatePick({ handleInput, minDate, label }) {
  const [selectedDate, handleDateChange] = useState(new Date());

  useEffect(() => {
    handleInput(selectedDate.toString());
  }, [selectedDate]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker value={selectedDate} variant='inline' label={label} disablePast={true} minutesStep={5} minDate={minDate ? new Date(minDate) : false} onChange={handleDateChange} />
    </MuiPickersUtilsProvider>
  );
}

export default DatePick;
