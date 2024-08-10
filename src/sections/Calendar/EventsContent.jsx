import PropTypes from "prop-types";
import { useState } from "react";
import { CgInfo } from "react-icons/cg";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { LuUser2 } from "react-icons/lu";
import { LoadingOutlined } from "@ant-design/icons";
import { format, parse } from "date-fns";
import { updateAppointmentState } from "/src/api/appointments/appointments-services";
import toast, { Toaster } from "react-hot-toast";
import { useDecode } from "../../hooks/useDecode";

function EventsContent({ eventInfo, forceCalendarUpdate, data }) {
  const decode = useDecode(localStorage.getItem("token"));
  const role = decode.role;
  const isADentist = role === "dentist";

  const infoAppointment = eventInfo.event;
  const infoReasonId = eventInfo.event.extendedProps.reasonId;
  const reason = data.reasons.find((reason) => reason.id === infoReasonId); // Encuentra el reason correspondiente en el array de reasons

  const boolAssistance =
    eventInfo.event.extendedProps.assistance === 1
      ? true
      : eventInfo.event.extendedProps.assistance === 0
      ? false
      : null; //Convierte la asistencia a booleano

  const backgroundColor = eventInfo.event.extendedProps.statusColor;
  const isWeekView = eventInfo.view.type === "timeGridWeek";
  const [assistence, setAssistence] = useState(boolAssistance);

  const handleAssistence = async (e) => {
    e.stopPropagation();
    const assistencePrev = assistence;
    setAssistence("loading");
    try {
      //se le da formato correcto para hacer la peticion al back
      const parsedDate = parse(
        infoAppointment.extendedProps.date,
        "dd-MM-yyyy",
        new Date()
      );
      const dateFormatted = format(parsedDate, "yyyy-MM-dd");
      const newAssistence =
        assistencePrev === true
          ? false
          : assistencePrev === false
          ? null
          : true;

      //informacion formateada solicitada por el back
      const formData = {
        patient_id: infoAppointment.extendedProps.patientId,
        dentist_id: infoAppointment.extendedProps.dentistId,
        reason_id: infoAppointment.extendedProps.reasonId,
        date: dateFormatted,
        time: infoAppointment.extendedProps.time,
        state: infoAppointment.extendedProps.state,
        ...(newAssistence !== null && { assistance: newAssistence }),
      };
      //peticion put
      const response = await updateAppointmentState({
        id: infoAppointment.id,
        data: formData,
      });
      if (response) {
        setAssistence(newAssistence);
        forceCalendarUpdate();
      }
    } catch (error) {
      console.error("Error al modificar el turno:", error);
      setAssistence(null);
      toast.error(
        "No se pudo marcar la asistencia. Por favor, intenta nuevamente."
      );
    }
  };

  const buttonProps = {
    null: {
      style:
        "bg-white hover:bg-white/70 border border-[#1B2B41]/70 text-textBlue",
      text: "Asistencia",
      icons: <LuUser2 />,
    },
    false: {
      style:
        "bg-[#FF9500] border border-[#6D4000]/70 text-white hover:bg-[#ff9500a8]",
      text: "Ausente",
      icons: <CgInfo />,
    },
    true: {
      style:
        "bg-[#24B849] border border-[#145F27]/70 text-white hover:bg-[#24b849c4]",
      text: "Presente",
      icons: <IoIosCheckmarkCircle />,
    },
    loading: {
      style:
        "bg-white hover:bg-white/70 border border-[#1B2B41]/70 text-textBlue",
      text: "Cargando...",
      icons: <LoadingOutlined spin />,
    },
  };

  return (
    <>
      <div
        className={`cursor-pointer hover:opacity-70 flex items-center justify-between px-2 mx-auto w-full ${
          isWeekView
            ? "text-sm text-[#1B2B41]/70 hover:text-textBlue"
            : "text-sm font-medium text-[#1B2B41]/70 hover:text-textBlue"
        }`}
      >
        {!isWeekView && (
          <div className="inline-flex items-center ">
            <div
              style={{ backgroundColor }}
              className="items-center w-4 h-4 mr-1 rounded-full"
            />
            <p className="hidden md:block me-2 text-nowrap">
              | {eventInfo.timeText}
            </p>
          </div>
        )}
        <b className="mx-auto">{eventInfo.event.title}</b>
        {!isWeekView && !isADentist && (
          <button
            className={`inline-flex font-sans font-medium gap-1 items-center text-xs px-3 py-1 ${buttonProps[assistence].style} rounded-md`}
            onClick={(e) => handleAssistence(e)}
          >
            {buttonProps[assistence].text}
            {buttonProps[assistence].icons}
          </button>
        )}
        {!isWeekView && isADentist && (
          <h3 className="text-textBlue">{reason.description}</h3>
        )}
      </div>
      <Toaster position="top-right" />
    </>
  );
}

export default EventsContent;

EventsContent.propTypes = {
  eventInfo: PropTypes.object.isRequired,
  forceCalendarUpdate: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
