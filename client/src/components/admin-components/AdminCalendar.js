import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input, Center } from "@chakra-ui/react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Calendar({ events, onDayClick }) {
  const [calenderevents, setCalenderEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const formatTimeTo12Hour = (time) => {
    const [hours, minutes] = time.split(":");
    const parsedHours = parseInt(hours, 10);

    let period = "AM";
    let formattedHours = parsedHours;

    if (parsedHours > 12) {
      period = "PM";
      formattedHours = parsedHours - 12;
    } else if (parsedHours === 12) {
      period = "PM";
    } else if (parsedHours === 0) {
      formattedHours = 12;
    }

    return `${formattedHours}:${minutes} ${period}`;
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = calenderevents.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedEvents = filteredEvents.sort((a, b) =>
    a.extendedProps.empName.localeCompare(b.extendedProps.empName)
  );

  useEffect(() => {
    fetchAllTimesheets();
  }, []);

  const fetchAllTimesheets = () => {
    axios
      .get("https://staff-minder-backend.onrender.com/api/employees/timesheets")
      .then((response) => {
        const allTimesheets = response.data;
        console.log(allTimesheets);
        const calendarEvents = allTimesheets.map((timesheet) => ({
          title: timesheet.employeeName,
          start: timesheet.date.slice(0, 10),
          //backgroundColor: "green",
          extendedProps: {
            date: timesheet.date.slice(0,10),
            empName: timesheet.employeeName,
            startTime: formatTimeTo12Hour(timesheet.fromTime),
            endTime: formatTimeTo12Hour(timesheet.toTime),
            file: timesheet.documents,
            note: timesheet.notes,
            timespent: timesheet.timeDifference || "Na",
          },
        }));
        setCalenderEvents(calendarEvents);
      })
      .catch((error) => {
        console.error("Error fetching timesheets:", error);
      });
  };

  const renderEventDetails = (event) => {
    return `
        
      <p>Date: ${event.extendedProps.date}</p>
      <p>Employee Name: ${event.extendedProps.empName}</p>
      <p>From: ${event.extendedProps.startTime}</p>
      <p>To: ${event.extendedProps.endTime}</p>
      <p>Time Spent:${event.extendedProps.timespent}</p>
      <p>Note: ${event.extendedProps.note}</p>
      <p>Attachements:${event.extendedProps.file}</p>
      `;
  };

  return (
    <div>
      <Center>
        <Input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search Employee"
          mr={2}
          mt={5}
          mb={{ base: "2", sm: "0" }}
          borderWidth="2px"
          borderRadius="md"
          borderColor="black"
          width="50%"
        />
      </Center>

      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={sortedEvents}
        eventDidMount={(info) => {
          return new bootstrap.Popover(info.el, {
            title: info.event.title,
            placement: "auto",
            trigger: "hover",
            customClass: "popoverStyle",
            content: renderEventDetails(info.event),
            html: true,
          });
        }}
        dateClick={(info) => {
          onDayClick(new Date(info.dateStr));
        }}
        eventContent={(info) => {
          return (
            <div
              className="fc-event-title fc-sticky"
              style={{
                //backgroundColor:
                  //info.event.title === "",
                color: "black",
                padding: "2px 5px",
                borderRadius: "5px",
              }}
            >
              {info.event.title}
            </div>
          );
        }}
      />
    </div>
  );
}

export default Calendar;
