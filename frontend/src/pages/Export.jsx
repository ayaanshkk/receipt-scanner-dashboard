import React from 'react';
import { Button, Container } from '@mui/material';

export default function ExportPage() {
  const handleExport = () => {
    window.open('/api/receipts/export', '_blank');
  };

  return (
    <Container>
      <Button variant="contained" onClick={handleExport}>Export to Excel</Button>
    </Container>
  );
}