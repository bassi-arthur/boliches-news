import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import * as dates from "date-arithmetic";
import {
  Calendar,
  Views,
  Navigate,
  momentLocalizer,
} from "react-big-calendar";
import TimeGrid from "../../../node_modules/react-big-calendar/lib/TimeGrid"; // use 'react-big-calendar/lib/TimeGrid'. Can't 'alias' in Storybook
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styles from "./styles.module.scss";
import Modal from "../../components/Modal";
import Head from "next/head";

function MyWeek({
  date,
  localizer,
  max = localizer.endOf(new Date(), "day"),
  min = localizer.startOf(new Date(), "day"),
  scrollToTime = localizer.startOf(new Date(), "day"),
  ...props
}) {
  const currRange = useMemo(
    () => MyWeek.range(date, { localizer }),
    [date, localizer]
  );

  return (
    <TimeGrid
      date={date}
      eventOffset={15}
      localizer={localizer}
      max={max}
      min={min}
      range={currRange}
      scrollToTime={scrollToTime}
      {...props}
    />
  );
}

MyWeek.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.object,
  max: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
};

MyWeek.range = (date, { localizer }) => {
  const start = date;
  const end = dates.add(start, 2, "day");

  let current = start;
  const range = [];

  while (localizer.lte(current, end, "day")) {
    range.push(current);
    current = localizer.add(current, 1, "day");
  }

  return range;
};

MyWeek.navigate = (date, action, { localizer }) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -3, "day");

    case Navigate.NEXT:
      return localizer.add(date, 3, "day");

    default:
      return date;
  }
};

MyWeek.title = (date) => {
  return `Eventos da semana: ${date.toLocaleDateString()}`;
};

export default function Calendario() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const localizer = momentLocalizer(moment); // or globalizeLocalizer
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(),
      views: {
        month: true,
        week: MyWeek,
      },
    }),
    []
  );
  const events = [
    {
      title: "Feirinha da p14",
      start: new Date("2022-11-12T08:00:00.000Z"),
      end: new Date("2022-11-12T09:00:00.000Z"),
      location: "Ponta negra",
      highlight: "Comidas Regionais",
      participants: ["Stand1", "Stand2", "Stand3", "Stand4", "Stand5", "Stand6", "Stand7", "Stand8", "Stand9", "Stand10"],
      allDay: false,
    },
  ];

  const handleClickOpenModal = (event) => {
    setOpenModal(true);
    setSelectedEvent(event);
  };

  return (
    <>
      <Head>
        <title>Calendário | Nerd Estranho</title>
      </Head>
      <div className={styles.calendarContainer}>
        <Modal
          event={selectedEvent}
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.MONTH}
          events={events}
          localizer={localizer}
          views={views}
          onSelectEvent={(e) => handleClickOpenModal(e)}
        />
      </div>
    </>
  );
}
