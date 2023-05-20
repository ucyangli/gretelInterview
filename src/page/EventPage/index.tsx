import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, fetchEvents, fetchResidents, AppDispatch } from '../../store';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import EventItem from '../../component/EventItem'


const EventPage = () => {
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
}

export default EventPage;