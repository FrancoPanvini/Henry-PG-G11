import React, { useState } from 'react';
import { Calendar, Badge } from 'antd';
import styles from './CalendarComponent.modules.css';
import EventPopUpDetail from './EventPopUpDetail';

function CalendarComponent({ eventos }) {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [eventId, setEventId] = useState();

  const handleOpenDetail = (e, id) => {
    e.preventDefault();
    setIsOpenDetail(true);
    setEventId(id);
  };

  function getListData(value) {
    const eventosByDay = eventos?.filter(evento => {
      return evento.initDate.substring(0, 10) === value.format('YYYY-MM-DD');
    });

    let listData = eventosByDay.map(evento => {
      return { type: 'success', content: evento.name, id: evento.id };
    });

    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className={styles.events}>
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} className='capitalize' onClick={e => handleOpenDetail(e, item.id)} />
          </li>
        ))}
      </ul>
    );
  }

  function getMonthData(value) {
    const eventosByMonth = eventos?.filter(evento => {
      return evento.initDate.substring(0, 7) === value.format('YYYY-MM');
    });

    let listData = eventosByMonth.map(evento => {
      return {
        type: 'success',
        day: evento.initDate.substring(8, 10),
        name: evento.name,
      };
    });

    return listData || [];
  }

  function monthCellRender(value) {
    const eventos = getMonthData(value);
    return eventos ? (
      <ul className={styles.events}>
        {eventos.map((evento, index) => (
          <li key={index}>
            <Badge status={evento.type} text={`${evento.day} ${evento.name}`} className='capitalize' />
          </li>
        ))}
      </ul>
    ) : null;
  }

  return (
    <>
      <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
      {isOpenDetail && <EventPopUpDetail onClose={() => setIsOpenDetail(false)} id={eventId} />}
    </>
  );
}

export default CalendarComponent;
