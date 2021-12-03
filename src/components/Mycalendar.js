import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

function Mycalendar(props) {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://customerrest.herokuapp.com/gettrainings`)
      .then((response) => response.json())
      .then((data) => {
        let xData = data;

        for (let i = 0; i < xData.length; i++) {
          xData[i].date = new Date(xData[i].date);
          xData[i].duration = new Date(
            moment(xData[i].date).add(xData[i].duration, "minutes").format()
          );
          xData[
            i
          ].customer = `${xData[i].customer.firstname}  ${xData[i].customer.lastname}`;
          xData[i].activity = `${xData[i].customer} | ${xData[i].activity}`;
        }

        setEvents(xData);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ maxWidth: "80%", margin: "auto" }}>
      <h1
        style={{
          textAlign: "left",
          marginBottom: "12px",
          marginTop: "12px",
          color: "#3174AD",
        }}
      >
        Calendar
      </h1>
      <Calendar
        localizer={localizer}
        style={{ height: "600px" }}
        events={events}
        titleAccessor="activity"
        startAccessor="date"
        endAccessor="duration"
      />
    </div>
  );
}
export default Mycalendar;
