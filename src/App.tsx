import React, { useEffect } from 'react';
import { Event } from './types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, fetchEvents, fetchResidents, AppDispatch} from './store';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { red } from '@mui/material/colors';
import { updateEventStatus } from './store';



const EventItem: React.FC<{ event: Event; residentName?: string }> = ({ event, residentName }) => {

  const dispatch = useDispatch<AppDispatch>();

  const formattedDateTime = new Date(event.datetime * 1000).toLocaleString('en-GB');
  let rowColor = '';

  if (event.status === 'done') {
    rowColor = '#f5f5f5'; // Grey color
  } else if (event.type === 'Emergency') {
    rowColor = red[500];
  } else if (event.type === 'Assistance') {
    rowColor = 'primary.light';
  }


  const handleStatusChange = () => {
    dispatch(updateEventStatus({  eventId: event.id}));
  };
  return (
    <TableRow sx={{backgroundColor:rowColor}}>
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


const App: React.FC = () => {
  const events = useSelector((state: RootState) => state.events.events);
  const residents = useSelector((state: RootState) => state.residents.residents);
  const dispatch = useDispatch<AppDispatch>();


  
  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchResidents());
  }, [dispatch]);


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

    // Sort the events to display the Emergency ones on top, Done ones on the bottom
    const sortedEvents = [...events].sort((a, b) => {
      if (a.status === 'done' && b.status !== 'done') {
        return 1;
      } else if (a.status !== 'done' && b.status === 'done') {
        return -1;
      } else if (a.type === 'Emergency' && b.type !== 'Emergency') {
        return -1;
      } else if (a.type !== 'Emergency' && b.type === 'Emergency') {
        return 1;
      }
      return 0;
    });

  return (
    <Paper sx={{ width: '100%' }}>
      <h1>Open Events</h1>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Resident Name</TableCell>
              <TableCell>Room ID</TableCell>
              <TableCell>Event Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedEvents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((event) => {
              const resident = residents.find((r) => r.id === event.residentId);
              const residentName = resident ? resident.name : 'Unknown Resident';

              return <EventItem key={event.id} event={event} residentName={residentName} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={events.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};        

export default App;
