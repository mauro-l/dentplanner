import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import EditShift from "../ShiftManager/Modal/EditShift";
import EventsContent from "./EventsContent";

export default function WeeklyCalendar({
  eventsDB,
  dateSelected,
  setModalModifyIsVisible,
  modalModifyIsVisible,
}) {
  const [calendarApis, setCalendarApis] = useState(null);

  //let nowStr = new Date().toISOString().slice(0, 19);

  console.log("Calendario", eventsDB);

  //Dirije hacie la vista diaria segun la fecha seleccionada en el MiniCalendar
  useEffect(() => {
    if (calendarApis && dateSelected) {
      //calendarApis.gotoDate(dateSelected);
      calendarApis.changeView("timeGridDay", dateSelected);
    }
  }, [calendarApis, dateSelected]);

  //Toma la referencia de la api del calendario cuando este listo
  /* const handleDatesSet = (arg) => {
    setTimeout(() => {
      setCalendarApis(arg.view.calendar);
    }, 0);
  }; */

  const handleDatesSet = useCallback((arg) => {
    setCalendarApis(arg.view.calendar);
  }, []);

  //funcion para añadir eventos
  function handleDateSelect(selectInfo) {
    let title = prompt("Alerta");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        //id: nowStr,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  function handleEventClick(clickInfo) {
    setModalModifyIsVisible(true);
    //console.log("evento clickeado", clickInfo.event);
    /* if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      console.log("evento clickeado", clickInfo.event);
      clickInfo.event.remove();
    } */
  }

  /* const renderEventContent = useCallback((eventInfo) => {
    const backgroundColor = eventInfo.event.extendedProps.statusColor;
    //console.log("evento clickeado", eventInfo.event.extendedProps.statusColor);
    const isWeekView = eventInfo.view.type === "timeGridWeek";
    console.log(eventInfo);

    return (
      <div
        className={`flex items-center justify-between mx-auto w-full ${
          isWeekView
            ? "text-sm text-textBlue"
            : "text-sm font-medium text-textBlue"
        }`}
      >
        {!isWeekView && (
          <div className="inline-flex items-center">
            <div
              style={{ backgroundColor }}
              className="w-2.5 h-2.5 mr-1 rounded-full items-center"
            />
            <p className="me-2">| {eventInfo.timeText}</p>
          </div>
        )}
        <b>{eventInfo.event.title}</b>
      </div>
    );
  }, []); */

  return (
    <>
      <div className="demo-app">
        <div className="demo-app-main">
          <FullCalendar
            locale={esLocale}
            plugins={[timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "timeGridWeek,timeGridDay",
            }}
            initialView="timeGridWeek"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={false}
            /* events */
            events={eventsDB}
            select={handleDateSelect}
            eventContent={(eventInfo) => (
              <EventsContent eventInfo={eventInfo} />
            )} // custom render function
            eventClick={handleEventClick}
            eventOverlap={false}
            //eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}          
            */
            /* eventContent={(eventInfo) => (
              <EventContent
                eventInfo={eventInfo}
                handleChangeState={handleChangeState}
                handleOpenUpdateWindow={handleOpenUpdateWindow}
              />
            )} */
            //dateClick={handleDateClick}
            datesSet={handleDatesSet}
            //CONFIGURACION PARA LAS CELDAS
            slotDuration="00:30:00"
            slotMinTime="08:00:00"
            slotMaxTime="21:00:00"
            allDaySlot={false}
            contentHeight={600}
            slotLabelFormat={{
              hour: "numeric",
              minute: "2-digit",
              meridiem: false,
            }}
          />
        </div>
      </div>
      {modalModifyIsVisible && (
        <EditShift
          isVisible={modalModifyIsVisible}
          setModalModifyIsVisible={setModalModifyIsVisible}
        />
      )}
    </>
  );
}

/* function renderEventContent(eventInfo) {
  const backgroundColor = eventInfo.event.backgroundColor;
  console.log(backgroundColor);
  // if (eventInfo.view.type === "timeGridDay") {
  //   return (
  //     <div className="inline-flex items-center text-sm font-medium text-textBlue">
  //       <i>{eventInfo.event.title}</i>
  //     </div>
  //   );
  // }
  // let diary = eventInfo.view.type === "timeGridDay";
  const week = " text-sm text-textBlue";
  const diary = "text-sm  font-medium text-textBlue";
  return (
    <div
      className={`flex items-center ${
        eventInfo.view.type === "timeGridDay" ? week : diary
      }`}
      
    >
      {eventInfo.view.type === "timeGridDay" && (
        <>
          <div
            style={{ backgroundColor: backgroundColor }}
            className={`w-2.5 h-2.5 rounded-full mr-2`}
          />
          <b className="me-2">{eventInfo.timeText}</b>
        </>
      )}

      <i>{eventInfo.event.title}</i>
    </div>
  );
} */

WeeklyCalendar.propTypes = {
  /* setStateCalendarApi: PropTypes.func.isRequired, */
  modalModifyIsVisible: PropTypes.bool.isRequired,
  setModalModifyIsVisible: PropTypes.func.isRequired,
  eventsDB: PropTypes.array.isRequired,
  dateSelected: PropTypes.string.isRequired, // Cambiado a string
};
