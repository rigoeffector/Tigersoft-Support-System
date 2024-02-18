/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import IssuesCard from './IssuesCard';
// import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { GET_TICKETS_LIST_REQUEST } from 'reducers/tickets/constants';
import { GET_USERS_LIST_REQUEST } from 'reducers/users/constants';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  const dispatch = useDispatch();

  const {
    getUsers: { data: listUsersData, loading: listUsersLoading },
    getTickets: { data: listTicketsData, loading: listTicketLoading }
  } = useSelector((state) => state);
  useEffect(() => {
    dispatch({ type: GET_TICKETS_LIST_REQUEST });
    dispatch({ type: GET_USERS_LIST_REQUEST });
  }, [dispatch]);
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            {!listTicketLoading && <IssuesCard isLoading={isLoading} title={'Total Pending Issues'} total={listTicketsData.filter((i)=>i.status=== 'PENDING').length} />}
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            {!listTicketLoading &&<IssuesCard isLoading={isLoading} title={'Total Fixed Issues'} total={listTicketsData.filter((i)=>i.status=== 'COMPLETED').length} />}
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
              {!listTicketLoading &&
                <TotalIncomeDarkCard isLoading={isLoading} title={'All Clients Issues'} total={listTicketsData.length} />}
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                {!listUsersLoading && (
                  <TotalIncomeLightCard isLoading={isLoading} title={'All Registered Clients'} total={listUsersData.length} />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
