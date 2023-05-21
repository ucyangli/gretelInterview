import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, fetchEvents, fetchResidents, AppDispatch } from '../../store';
import { Box, Grid, Pagination ,useMediaQuery, useTheme } from '@mui/material';
import EventItem from '../../component/EventItem'


const EventPage = () => {
  const events = useSelector((state: RootState) => state.events.events);
  const residents = useSelector((state: RootState) => state.residents.residents);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchResidents());
  }, [dispatch]);

  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const itemsPerPage = isLg ? 36 : isMd ? 24 : isSm ? 18 : 12;


  console.log(itemsPerPage)
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };


  const sortedEvents = [...events]
    //get rid off done events
    .filter((event) => event.status !== 'done')
    .sort((a, b) => {
      // Sort by type (Emergency first)
      if (a.type === 'Emergency' && b.type !== 'Emergency') return -1;
      if (a.type !== 'Emergency' && b.type === 'Emergency') return 1;
      // Sort by datetime (ealiest first)
      return a.datetime - b.datetime;
    });

  const paginationEvents = sortedEvents.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)

  return (
    <>
      <Box sx={{ minHeight: 'calc(100vh - 100px)' }}>
        {paginationEvents.length === 0 ?
          <div>No active events</div> :
          <Grid container spacing={4}>
            {paginationEvents
              .map((event) => {
                const resident = residents.find((r) => r.id === event.residentId);
                const residentName = resident ? resident.name : 'Unknown Resident';
                return <EventItem key={event.id} event={event} residentName={residentName} />;
              })}
          </Grid>}
      </Box >
      <Box sx={{ height: '100px', display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <Pagination
          count={Math.ceil(events.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          style={{ marginTop: '16px' }}
        />
      </Box>
    </>
  );
}

export default EventPage;