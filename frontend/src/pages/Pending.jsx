import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReceiptTable from '../components/ReceiptTable';

export default function Pending() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get('/api/receipts/pending').then(res => setItems(res.data));
  }, []);

  return <ReceiptTable receipts={items} />;
}