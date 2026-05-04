import { useState, useEffect,useCallback } from 'react';
import API from '../api/axios';
import { useSocket } from '../context/SocketContext';
import './TableMap.css'; // Create later

const TableMap = ({ date, startTime, onSelectTables }) => {
  const [tables, setTables] = useState([]);
  const [selected, setSelected] = useState([]);
  const socket = useSocket();

  const fetchTables = useCallback(async () => {
  try {
    const res = await API.get('/api/tables');
    const bookingsRes = await API.get(`/api/bookings?date=${date}`);
    const bookings = bookingsRes.data || [];

    const tablesWithStatus = res.data.map(table => {
      const isBooked = bookings.some(b =>
        b.tableIds.some(id => id === table._id.toString()) &&
        new Date(b.startTime) <= new Date(`${date}T${startTime}`) &&
        new Date(b.endTime) > new Date(`${date}T${startTime}`)
      );

      const isUpcoming = bookings.some(b =>
        b.tableIds.some(id => id === table._id.toString())
      );

      let status = 'available';
      if (isBooked) status = 'busy';
      else if (isUpcoming) status = 'upcoming';

      return { ...table, status };
    });

    setTables(tablesWithStatus);
  } catch (err) {
    console.error(err);
  }
  }, [date, startTime]); // 🔥 important

  useEffect(() => {
    const loadTables = async () => {
      await fetchTables();
    };
   
    loadTables();
  }, [fetchTables]);

  useEffect(() => {
    socket?.emit('join-tables');
    const handleUpdate = () => fetchTables();
    window.addEventListener('tableUpdate', handleUpdate);
    return () => window.removeEventListener('tableUpdate', handleUpdate);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleTable = (tableId) => {
    setSelected(prev => 
      prev.includes(tableId) 
        ? prev.filter(id => id !== tableId)
        : [...prev, tableId]
    );
  };

  const getStatusColor = (status) => {
    return { available: '#4ade80', busy: '#ef4444', upcoming: '#f97316' }[status] || 'gray';
  };

  return (
    <div className="table-map">
      <h3>Table Layout ({date})</h3>
      <div className="floor-plan">
        {tables.map(table => (
          <div 
            key={table._id}
            className={`table ${table.status} ${selected.includes(table._id) ? 'selected' : ''}`}
            style={{ backgroundColor: getStatusColor(table.status) }}
            onClick={() => toggleTable(table._id)}
            title={`${table.tableNumber} (${table.status})`}
          >
            <div className="table-number">T{table.tableNumber}</div>
            <div className="capacity">{table.capacity} seats</div>
          </div>
        ))}
      </div>
      {selected.length > 0 && (
        <button onClick={() => onSelectTables(selected)}>
          Book Selected Tables ({selected.length})
        </button>
      )}
      <button onClick={fetchTables}>🔄 Live Refresh</button>
    </div>
  );
};

export default TableMap;

