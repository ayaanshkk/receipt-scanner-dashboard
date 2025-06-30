import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import StatsCard from '../components/StatsCard';

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/analytics').then(res => setData(res.data));
  }, []);

  if (!data) return <Typography>Loading...</Typography>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <StatsCard title="Total Receipts" value={data.totalCount} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatsCard title="Pending Receipts" value={data.pendingCount} />
      </Grid>
      <Grid item xs={12} md={4}>
        <StatsCard title="Approved Receipts" value={data.approvedCount} />
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Monthly Spend</Typography>
          {/* Chart implementation here */}
        </Paper>
      </Grid>
    </Grid>
  );
}