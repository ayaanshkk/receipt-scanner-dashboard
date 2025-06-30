import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function StatsCard({ title, value }) {
  return (
    <Card sx={{ minWidth: 150 }}>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
}