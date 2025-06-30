import React from 'react';
import { Typography, Switch, FormControlLabel, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } });

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h6">Settings</Typography>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
          label="Dark Mode"
        />
      </Container>
    </ThemeProvider>
  );
}