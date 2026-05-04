const Table = require('../models/Table');
const Reservation = require('../models/Reservation');

// Get available tables for time slot (no overlaps)
async function getAvailableTables(date, startTime, endTime) {
  const tables = await Table.find({});
  const bookings = await Reservation.find({
    date: new Date(date),
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
    status: { $ne: 'cancelled' }
  });

  const bookedTableIds = new Set();
  bookings.forEach(b => b.tableIds.forEach(id => bookedTableIds.add(id)));

  return tables.filter(t => !bookedTableIds.has(t._id.toString()));
}

// Smart allocate: best-fit single or merge
async function allocateTables(guests, date, startTime, endTime) {
  const available = await getAvailableTables(date, startTime, endTime);
  if (available.length === 0) return null;

  // Sort ASC capacity
  available.sort((a, b) => a.capacity - b.capacity);

  // Try single table
  let bestSingle = available.find(t => t.capacity >= guests);
  if (bestSingle) {
    const waste = bestSingle.capacity - guests;
    return { tableIds: [bestSingle._id.toString()], waste, usedTables: 1 };
  }

  // Try combinations of 2 tables
  for (let i = 0; i < available.length; i++) {
    for (let j = i + 1; j < available.length; j++) {
      if (available[i].capacity + available[j].capacity >= guests) {
        return {
          tableIds: [available[i]._id.toString(), available[j]._id.toString()],
          waste: available[i].capacity + available[j].capacity - guests,
          usedTables: 2
        };
      }
    }
  }

  // More than 2 if needed (simple extend later)
  return null;
}

module.exports = { allocateTables, getAvailableTables };

