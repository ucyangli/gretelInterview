import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { Grid, Paper, ButtonBase, styled } from '@mui/material';
import { Event } from "../../types";
import { red } from '@mui/material/colors';
import { updateEventStatus } from "../../store";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(4),
  minWidth: 200
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

  let eventColor = '';

  if (event.status === 'done') {
    eventColor = '#f5f5f5'; // Grey color
  } else if (event.type === 'Emergency') {
    eventColor = red[500];
  } else if (event.type === 'Assistance') {
    eventColor = 'primary.light';
  }


  const handleStatusChange = () => {
    dispatch(updateEventStatus({ eventId: event.id }));
  };
  return (
    <Grid item  xs={6} sm={4} md={3} lg={2}>
    <ButtonBase
      onClick={() => handleStatusChange()}
      disabled={event.status === 'done'}
    >
      <Item square={true} sx={{
        backgroundColor: eventColor,
        mx: 2,
      }} >
        <div>Resident: {residentName}</div>
        <div>Room ID: {event.roomId}</div>
        <div> {timeDifference}</div>
      </Item>
    </ButtonBase> 
    </Grid>
  );
};

export default EventItem;