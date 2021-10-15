import React from 'react';
import { Calendar, Badge } from 'antd';
// import 'antd/dist/antd.css';
import styles from './CalendarComponent.modules.css';

function CalendarComponent({ eventos }) {
  function getListData(value) {
    const eventosByDay = eventos.filter(evento => {
      return evento.initDate.substring(0, 10) === value.format('YYYY-MM-DD');
    });

    let listData = eventosByDay.map(evento => {
      return { type: 'success', content: evento.name };
    });

    return listData || [];
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className={styles.events}>
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }

  function getMonthData(value) {
    const eventosByMonth = eventos.filter(evento => {
      return evento.initDate.substring(0, 7) === value.format('YYYY-MM');
    });

    let listData = eventosByMonth.map(evento => {
      return { type: 'success', day: evento.initDate.substring(8, 10), name: evento.name };
    });

    return listData || [];
  }

  function monthCellRender(value) {
    const eventos = getMonthData(value);
    return eventos ? (
      <ul className={styles.events}>
        {eventos.map((evento, index) => (
          <li key={index}>
            <Badge status={evento.type} text={`${evento.day} ${evento.name}`} />
          </li>
        ))}
      </ul>
    ) : null;
  }

  return <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} className='' />;
}

export default CalendarComponent;
