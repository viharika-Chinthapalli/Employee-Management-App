import React from "react";
import {
  Box,
  Center,
  Heading,
} from "@chakra-ui/react";
import Calendar from "./AdminCalendar";
import AdminNavbar from "./AdminNavbar";

const Timesheet = () => {
  const [calendarEvents, setCalendarEvents] = React.useState([]);
  const [selectedDates, setSelectedDates] = React.useState({
    starttime: null,
    endtime: null,
    file: null,
  });

  const handleDateSelect = (date) => {
    setSelectedDates((prevDates) => {
      if (!prevDates.startDate) {
        return { startDate: date, endDate: date };
      } else if (prevDates.startDate && !prevDates.endDate) {
        return date < prevDates.startDate
          ? { startDate: date, endDate: prevDates.startDate }
          : { startDate: prevDates.startDate, endDate: date };
      } else {
        const isShortLeave =
          date.toDateString() === prevDates.startDate.toDateString();
        if (isShortLeave) {
          return { startDate: date, endDate: date };
        } else {
          return date > prevDates.startDate
            ? {
                startDate: prevDates.startDate,
                endDate: new Date(date.getTime() + 86400000),
              }
            : { startDate: date, endDate: prevDates.startDate };
        }
      }
    });
  };

  return (
    <Box>
      <AdminNavbar />
      <Center>
        <Heading size="lg" mb={4} textAlign="center" color="black">
          Timesheets
        </Heading>
      </Center>
      <Calendar
        onDayClick={handleDateSelect}
        value={selectedDates}
        events={calendarEvents}
      />
    </Box>
  );
};

export default Timesheet;
