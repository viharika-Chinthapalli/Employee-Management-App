import React from "react";
import {
  Box,
  Button,
  Center,
  extendTheme,
  ChakraProvider,
} from "@chakra-ui/react";
import LeaveCalendar from "./LeaveCalendar";
import ShortLeaveForm from "./ShortLeave";
import LongLeaveForm from "./LongLeave";
import EmployeeNavbar from "./EmployeeNavbar";
import { useUserContext } from "../../UserContext";

const customTheme = extendTheme({ 
  colors: {
    brandBlue: "#0A6EBD",
    brandLightBlue: "#45cfdd",
  },
});

const EmployeeLeaveRequests = () => {
  const [calendarEvents, setCalendarEvents] = React.useState([]);
  const [selectedDates, setSelectedDates] = React.useState({
    startDate: null,
    endDate: null,
  });

  const [showShortLeaveForm, setShowShortLeaveForm] = React.useState(false);
  const [showLongLeaveForm, setShowLongLeaveForm] = React.useState(false);
  const { userEmail } = useUserContext();
  console.log("userEmail:", userEmail);

  const handleApplyLeave = () => {
    setShowLongLeaveForm(true);
  };

  const handleApplyShortLeave = () => {
    setShowShortLeaveForm(true);
  };

  const updateCalendarEvents = (eventData) => {
    setCalendarEvents([...calendarEvents, eventData]);
  };

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
    <div>
      <EmployeeNavbar />
      <Box mt={10}>
        <LeaveCalendar
          onDayClick={handleDateSelect}
          value={selectedDates}
          events={calendarEvents}
          userEmail={userEmail}
        />

        <Center>
          <Button
            onClick={handleApplyLeave}
            disabled={!selectedDates.endDate}
            bg="#0A6EBD"
            color="white"
            border="none"
            borderRadius="10px"
            _hover={{ bg: "#085794" }}
            _focus={{ boxShadow: "none" }}
            m={10}
            p={5}
          >
            Apply Leave
          </Button>

          <Button
            onClick={handleApplyShortLeave}
            disabled={!selectedDates.endDate}
            bg="#0A6EBD"
            color="white"
            border="none"
            borderRadius="10px"
            _hover={{ bg: "#085794" }}
            _focus={{ boxShadow: "none" }}
            m={10}
            p={5}
          >
            Apply Short Leave
          </Button>
        </Center>

        {showShortLeaveForm && (
          <ChakraProvider theme={customTheme}>
            <ShortLeaveForm
              onClose={() => setShowShortLeaveForm(false)}
              onSubmit={(formData) => {
                const { date, fromTime, toTime, reason, status } = formData;
                const newEvent = {
                  title: "Short Leave",
                  start: date,
                  end: date,
                  color: "green",
                  extendedProps: {
                    reason: reason,
                    fromTime: fromTime,
                    toTime: toTime,
                    status: status,
                  },
                };
                updateCalendarEvents(newEvent);
                setShowShortLeaveForm(false);
              }}
            />
          </ChakraProvider>
        )}

        {showLongLeaveForm && (
          <ChakraProvider theme={customTheme}>
            <LongLeaveForm
              startDate={selectedDates.startDate}
              endDate={selectedDates.endDate}
              onClose={() => setShowLongLeaveForm(false)}
              onSubmit={(formData) => {
                const { startDate, endDate, reason, status } = formData;
                const newEvent = {
                  title: "Long Leave",
                  start: startDate,
                  end: endDate,
                  color: "red",
                  extendedProps: {
                    reason: reason,
                    fromDate: startDate,
                    toDate: endDate,
                    status: status,
                  },
                };
                updateCalendarEvents(newEvent);
                setShowLongLeaveForm(false);
              }}
              updateCalendarEvents={updateCalendarEvents}
            />
          </ChakraProvider>
        )}
      </Box>
    </div>
  );
};

export default EmployeeLeaveRequests;
