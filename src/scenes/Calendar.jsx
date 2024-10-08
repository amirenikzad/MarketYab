import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { tokens } from "../theme";
import { Box, Typography, useTheme } from "@mui/material";
import EventList from "./EventList";
export let currentEvents = [];
export let setCurrentEvents;

export default function Calendar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    const eventsFromLocalStorage = JSON.parse(localStorage.getItem("events")) || [];
    setCurrentEvents(eventsFromLocalStorage);
  }, []);

  const saveEventsToLocalStorage = (events) => {
    localStorage.setItem("events", JSON.stringify(events));
  };

  const handleDateClick = (selected) => {
    const title = prompt("Kindly Enter Event Title:");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      };

      setCurrentEvents((prevEvents) => {
        const updatedEvents = [...prevEvents, newEvent];
        saveEventsToLocalStorage(updatedEvents);
        return updatedEvents;
      });
    }
  };

  const handleEventClick = (selected) => {
    if (window.confirm(`Are you sure you want to delete this event '${selected.event.title}'?`)) {
      setCurrentEvents((prevEvents) => {
        const updatedEvents = prevEvents.filter((event) => event.id !== selected.event.id);
        saveEventsToLocalStorage(updatedEvents);
        return updatedEvents;
      });
    }
  };

  const handleEventDrop = (info) => {
    const updatedEvents = currentEvents.map((event) => {
      if (event.id === info.event.id) {
        return {
          ...event,
          start: info.event.startStr,
          end: info.event.endStr,
        };
      }
      return event;
    });

    setCurrentEvents(updatedEvents);
    saveEventsToLocalStorage(updatedEvents);
  };

  return (
    <Box m="0.5rem 1rem">
      <Box display="flex" justifyContent="space-between">
        <Box
          flex="1 1 20%"
          backgroundColor={colors.greenAccent[900]}
          borderRadius="0.5rem"
          p="1rem"
          m="1rem 0rem"
        >
          <Typography variant="h6" style={{ textAlign: "right", fontSize: "25px" }}>رویداد‌‌ها</Typography>
          <EventList events={currentEvents} colors={colors} />
        </Box>
        {/* calendar */}
        <Box flex="1 1 80%" borderRadius="0.5rem" p="1rem">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents} 
            eventDrop={handleEventDrop} 
          />
        </Box>
      </Box>
    </Box>
  );
}
