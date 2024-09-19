
import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { formatDate } from "@fullcalendar/core";

const EventList = ({ events, colors }) => {
  return (
    <List>
      {events.length === 0 ? (
        <Typography variant="h6" color="textSecondary" style={{ textAlign: "right", fontSize: "20px" }}>
          رویداد‌‌ی وجود ندارد
        </Typography>
      ) : (
        events.map((event) => (
          <ListItem
            key={event.id}
            style={{ textAlign: "right", fontSize: "25px" }}
            sx={{
              backgroundColor: colors.greenAccent[800],
              margin: "10px 0",
              borderRadius: "2px",
            }}
          >
            <ListItemText
              primary={event.title}
              secondary={
                <Typography>
                  {formatDate(event.start, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
              }
            />
          </ListItem>
        ))
      )}
    </List>
  );
};

export default EventList;
