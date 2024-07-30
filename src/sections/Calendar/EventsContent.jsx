import PropTypes from "prop-types";
import Button from "../../components/Button";

function EventsContent({ eventInfo }) {
  const backgroundColor = eventInfo.event.extendedProps.statusColor;
  //console.log("evento clickeado", eventInfo.event.extendedProps.statusColor);
  const isWeekView = eventInfo.view.type === "timeGridWeek";
  console.log(backgroundColor);
  return (
    <div
      className={`flex items-center justify-between px-2 mx-auto w-full ${
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
          <p className="me-2 text-nowrap">| {eventInfo.timeText}</p>
        </div>
      )}
      <b className="mx-auto">{eventInfo.event.title}</b>
      <button
        className={`inline-flex items-center text-xs px-3 py-0.5 bg-white border border-[#1B2B41]/70 text-textBlue rounded-md ${
          isWeekView && "hidden"
        }`}
        onClick={() => alert()}
      >
        Asistencia
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 2.5C2.5 1.83696 2.76339 1.20107 3.23223 0.732233C3.70107 0.263392 4.33696 0 5 0C5.66304 0 6.29893 0.263392 6.76777 0.732233C7.23661 1.20107 7.5 1.83696 7.5 2.5C7.5 3.16304 7.23661 3.79893 6.76777 4.26777C6.29893 4.73661 5.66304 5 5 5C4.33696 5 3.70107 4.73661 3.23223 4.26777C2.76339 3.79893 2.5 3.16304 2.5 2.5ZM1.911 6.336C2.7125 5.847 3.8025 5.5 5 5.5C5.22367 5.5 5.443 5.51167 5.658 5.535C5.74389 5.54421 5.82592 5.57552 5.89611 5.62587C5.96629 5.67621 6.02224 5.74389 6.0585 5.82229C6.09475 5.90069 6.11008 5.98714 6.10298 6.07323C6.09588 6.15932 6.06661 6.24209 6.018 6.3135C5.67935 6.81063 5.4988 7.39848 5.5 8C5.5 8.46 5.6035 8.895 5.7875 9.2835C5.82335 9.35918 5.83962 9.44266 5.83481 9.52627C5.83 9.60988 5.80426 9.69094 5.75997 9.76201C5.71567 9.83309 5.65423 9.89189 5.58129 9.93304C5.50835 9.97418 5.42624 9.99635 5.3425 9.9975L5 10C3.8855 10 2.8325 9.93 2.0435 9.721C1.651 9.617 1.2815 9.468 1.0015 9.243C0.705 9.005 0.5 8.6725 0.5 8.25C0.5 7.8565 0.679 7.4885 0.922 7.1805C1.169 6.868 1.5105 6.5805 1.911 6.3355V6.336ZM8 9.5C8.00002 9.37753 8.04498 9.25933 8.12636 9.16781C8.20774 9.0763 8.31987 9.01783 8.4415 9.0035L8.501 9C8.62844 9.00014 8.75102 9.04894 8.84368 9.13642C8.93635 9.22391 8.99212 9.34348 8.99959 9.4707C9.00705 9.59792 8.96566 9.72319 8.88387 9.82092C8.80207 9.91864 8.68605 9.98145 8.5595 9.9965L8.5 10C8.36739 10 8.24021 9.94732 8.14645 9.85355C8.05268 9.75979 8 9.63261 8 9.5ZM8.2835 7.125C8.31102 7.07734 8.35349 7.0401 8.40434 7.01904C8.45518 6.99798 8.51155 6.99429 8.56471 7.00853C8.61786 7.02277 8.66483 7.05416 8.69834 7.09782C8.73184 7.14148 8.75 7.19497 8.75 7.25C8.75 7.3175 8.726 7.3775 8.5895 7.49L8.517 7.547L8.462 7.588C8.425 7.6155 8.381 7.648 8.3405 7.681L8.271 7.739C8.16144 7.83261 8.07748 7.95253 8.027 8.0875C7.98609 8.20699 7.99191 8.33753 8.04329 8.45291C8.09468 8.56828 8.18783 8.65993 8.30402 8.70945C8.42021 8.75896 8.55083 8.76267 8.66964 8.71983C8.78845 8.67699 8.88665 8.59077 8.9445 8.4785L8.993 8.44L9.1715 8.305L9.225 8.262L9.3155 8.183C9.5185 7.996 9.75 7.699 9.75 7.25C9.75019 6.97502 9.6597 6.70765 9.49255 6.48931C9.3254 6.27097 9.09091 6.11383 8.82541 6.04225C8.55991 5.97066 8.27822 5.98862 8.02396 6.09334C7.7697 6.19806 7.55707 6.3837 7.419 6.6215C7.35223 6.73614 7.33374 6.87261 7.36759 7.00088C7.40144 7.12916 7.48486 7.23873 7.5995 7.3055C7.71414 7.37227 7.85061 7.39076 7.97888 7.35691C8.10716 7.32306 8.21673 7.23964 8.2835 7.125Z"
            fill="#006AF5"
          />
        </svg>
      </button>
    </div>
  );
}

export default EventsContent;

EventsContent.propTypes = {
  eventInfo: PropTypes.object.isRequired,
};
