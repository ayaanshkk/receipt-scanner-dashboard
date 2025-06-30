import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

export default function ReceiptTable({ receipts }) {
  const [loadingId, setLoadingId] = useState(null);

  const handleApprove = async (id) => {
    if (!window.confirm("Are you sure you want to approve this receipt?")) return;

    try {
      setLoadingId(id);
      await axios.patch(`/api/receipts/${id}/approve`);
      window.location.reload();
    } catch (err) {
      console.error('Error approving receipt:', err);
      alert('Failed to approve receipt. Please try again.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Vendor</TableCell>
          <TableCell>Total</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {receipts.map((r) => (
          <TableRow key={r._id}>
            <TableCell>{r.data.date}</TableCell>
            <TableCell>{r.data.vendor}</TableCell>
            <TableCell>{r.data.total}</TableCell>
            <TableCell>
              <Button
                onClick={() => handleApprove(r._id)}
                variant="contained"
                size="small"
                disabled={loadingId === r._id}
              >
                {loadingId === r._id ? <CircularProgress size={16} /> : 'Approve'}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
