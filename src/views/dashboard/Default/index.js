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

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <IssuesCard isLoading={isLoading} title={'Total Pending Issues'} total={5900} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
          <IssuesCard isLoading={isLoading} title={'Total Fixed Issues'} total={1200} />

          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard isLoading={isLoading} title={'All Clients Issues'} total={3400} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard isLoading={isLoading}  title={'All Registered Clients'} total={13400}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
     
    </Grid>
  );
};

export default Dashboard;
