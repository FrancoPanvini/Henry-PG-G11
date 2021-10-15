import React from 'react';
import { useSelector } from 'react-redux';

//? Components
import CalendarComponent from './CalendarComponent';

function CalendarContainer() {
  const eventos = useSelector(state => state.events);

  return (
    <div className='p-12 h-full text-left w-full'>
      <div className='p-4 bg-gradient-to-r from-thirty to-fourty items-center  w-full'>
        <h1 className='text-6xl font-bold grid justify-items-center  text-gray-200'>EVENTOS</h1>
      </div>
      <div>
        <CalendarComponent eventos={eventos} />
      </div>
    </div>
  );
}

export default CalendarContainer;
