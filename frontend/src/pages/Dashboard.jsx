import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Analytics from './Analytics';
import Pending from './Pending';
import ExportPage from './Export';
import Settings from './Settings';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const [tab, setTab] = useState(0);
  const { logout } = useAuth();

  const handleChange = (_, newValue) => setTab(newValue);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit"><MenuIcon /></IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Receipt Dashboard</Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Tabs value={tab} onChange={handleChange} centered>
        <Tab label="Analytics" />
        <Tab label="Pending" />
        <Tab label="Export" />
        <Tab label="Account" />
      </Tabs>

      <Box sx={{ p: 3 }}>
        {tab === 0 && <Analytics />}
        {tab === 1 && <Pending />}
        {tab === 2 && <ExportPage />}
        {tab === 3 && <Settings />}
      </Box>
    </Box>
  );
}