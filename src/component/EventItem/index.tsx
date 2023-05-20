
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { TableCell, TableRow, Button } from '@mui/material';
import { Event } from "../../types";
import { red } from '@mui/material/colors';
import { updateEventStatus } from "../../store";


const EventItem: React.FC<{ event: Event; residentName?: string }> = ({ event, residentName }) => {

  const dispatch = useDispatch<AppDispatch>();

  const formattedDateTime = new Date(event.datetime * 1000).toLocaleString('en-AU');
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
      <TableCell>{residentName}</TableCell>
      <TableCell>{event.roomId}</TableCell>
      <TableCell >{event.type}</TableCell>
      <TableCell>{event.status}</TableCell>
      <TableCell>{formattedDateTime}</TableCell>
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