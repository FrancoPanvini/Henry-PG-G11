import React, { useState, useEffect } from 'react';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function DatePick({ handleInput, minDate, label }) {
  const [selectedDate, handleDateChange] = useState(new Date());

  useEffect(() => {
    handleInput(selectedDate.toString());
    // eslint-disable-next-line
  }, [selectedDate]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker value={selectedDate} variant='inline' label={label} disablePast={true} minutesStep={5} minDate={minDate ? new Date(minDate) : false} onChange={handleDateChange} />
    </MuiPickersUtilsProvider>
  );
}

export default DatePick;
