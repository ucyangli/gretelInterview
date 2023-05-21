import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { TableCell, TableRow, Button, styled } from '@mui/material';
import { Event } from "../../types";
import { red } from '@mui/material/colors';
import { updateEventStatus } from "../../store";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: '2rem',
}));




const EventItem: React.FC<{ event: Event; residentName?: string }> = ({ event, residentName }) => {

  const getTimeDifferenceText = (difference: number): string => {
    if (difference < 60) {
      return `${Math.floor(difference)} seconds ago`;
    } else if (difference < 3600) {
      return `${Math.floor(difference / 60)} minutes ago`;
    } else if (difference < 86400) {
      return `${Math.floor(difference / 3600)} hours ago`;
    } else {
      return `${Math.floor(difference / 86400)} days ago`;
    }
  };

  const [timeDifference, setTimeDifference] = React.useState<string>(() => {
    const currentTime = new Date().getTime() / 1000;
    const eventTime = event.datetime;
    const difference = currentTime - eventTime;
    return getTimeDifferenceText(difference);
  });

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime() / 1000;
      const eventTime = event.datetime;
      const difference = currentTime - eventTime;
      const timeDifferenceText = getTimeDifferenceText(difference);
      setTimeDifference(timeDifferenceText);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [event.datetime]);

  const dispatch = useDispatch<AppDispatch>();

  let rowColor = '';

  if (event.status === 'done') {
    rowColor = '#f5f5f5'; // Grey color
  } else if (event.type === 'Emergency') {
    rowColor = red[500];
  } else if (event.type === 'Assistance') {
    rowColor = 'primary.light';
  }


  const handleStatusChange = () => {
    dispatch(updateEventStatus({ eventId: event.id }));
  };
  return (
    <TableRow sx={{ backgroundColor: rowColor }}>
      <StyledTableCell>{residentName}</StyledTableCell>
      <StyledTableCell>{event.roomId}</StyledTableCell>
      <StyledTableCell >{event.type}</StyledTableCell>
      <StyledTableCell>{event.status}</StyledTableCell>
      <StyledTableCell>{timeDifference}</StyledTableCell>
      {!(event.status === 'done') && (
        <TableCell>
          <Button variant="outlined" color="inherit" onClick={handleStatusChange}>
            Mark Done
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
};

export default EventItem;