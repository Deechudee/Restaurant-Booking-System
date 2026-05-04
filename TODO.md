# Smart Real-Time Restaurant Reservation System - Implementation TODO

## Legend
- [ ] **Todo**
- [x] **Done**

## Phase 1: Backend Foundation (Models/Routes/Controllers)
- [x] 1. Create/Update Models: User.js, Reservation.js (+userId/status), new Waitlist.js
- [x] 2. Create utils/tableService.js: Smart allocation logic (best-fit + merging)
- [x] 3. Install backend deps: socket.io
- [x] 4. Update controllers: bookingController (integrate alloc/auth/socket), new waitlistController, adminController (analytics)
- [x] 5. Fix routes: bookingRoutes (remove dup), add waitlistRoutes/adminRoutes, mount in server.js
- [x] 6. Socket.IO: Init server.js, events for table/booking/waitlist updates

## Phase 2: Frontend
- [ ] 7. Install frontend deps: socket.io-client, recharts
- [x] 8. Create SocketContext.jsx, TableMap.jsx (visual layout/color-coding)
- [x] 9. Update BookingForm.jsx: Duration, auto-allocate, table selection
- [ ] 10. Add Waitlist view/page
- [ ] 11. Update AdminPanel.jsx: Dashboard/analytics/charts
- [ ] 12. Integrate real-time updates across components

## Phase 3: Integrations & Polish
- [ ] 13. Auth protection on booking/admin
- [ ] 14. Priority logic (frequent users)
- [ ] 15. Test end-to-end: Book/merge/waitlist/cancel/promo
- [ ] 16. Seed sample tables/data

**Current Progress: Starting Phase 1**

*Updated after each step.*

