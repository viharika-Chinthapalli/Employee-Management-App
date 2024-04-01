import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function LeaveCalendar({ onDayClick, userEmail }) {
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`https://staff-minder-backend.onrender.com/api/employees`)
      .then((response) => {
        const employee = response.data.find(
          (employee) => employee.email === userEmail
        );

        if (employee) {
          axios
            .get(
              `https://staff-minder-backend.onrender.com/api/employee/${employee._id}/leaverequest`
            )
            .then((leaveRequestsResponse) => {
              const leaveRequests = leaveRequestsResponse.data.map(
                (leaveRequest) => ({
                  title: leaveRequest.reason,
                  start: leaveRequest.fromDate,
                  end: leaveRequest.toDate,
                  extendedProps: {
                    reason: leaveRequest.reason,
                    status: leaveRequest.status,
                  },
                })
              );

              axios
                .get(
                  `https://staff-minder-backend.onrender.com/api/employee/${employee._id}/shortleaverequest`
                )
                .then((shortLeaveRequestsResponse) => {
                  const shortLeaveRequests =
                    shortLeaveRequestsResponse.data.map(
                      (shortLeaveRequest) => ({
                        title: "Short Leave",
                        start: shortLeaveRequest.date,
                        end: shortLeaveRequest.date,
                        extendedProps: {
                          reason: shortLeaveRequest.reason,
                          timeRange: `${shortLeaveRequest.fromTime} to ${shortLeaveRequest.toTime}`,
                          status: shortLeaveRequest.status,
                        },
                      })
                    );
                  const allEvents = [...leaveRequests, ...shortLeaveRequests];
                  setCalendarEvents(allEvents);
                })
                .catch((error) => {
                  console.error(
                    "Error fetching employee's short leave requests:",
                    error
                  );
                });
            })
            .catch((error) => {
              console.error("Error fetching employee's leave requests:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, [userEmail]);

  const renderEventDetails = (event) => {
    if (event.title === "Short Leave") {
      return `
        <p>From: ${event.extendedProps.timeRange}</p>
        <p>${event.extendedProps.reason}</p>
        <p>${event.extendedProps.status}
      `;
    } else {
      return `<p>${event.extendedProps.reason}</p>
      <p>${event.extendedProps.status}</p>`;
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView={"dayGridMonth"}
      headerToolbar={{
        start: "today prev,next",
        center: "title",
        end: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      height={"90vh"}
      events={calendarEvents}
      eventDidMount={(info) => {
        return new bootstrap.Popover(info.el, {
          title: "Leave",
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
              backgroundColor:
                info.event.title === "Short Leave" ? "#ffcc00" : "",
              color: "white",
              padding: "2px 5px",
              borderRadius: "5px",
            }}
          >
            {info.event.title}
          </div>
        );
      }}
    />
  );
}

export default LeaveCalendar;
