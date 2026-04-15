import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Ticket from "./pages/Ticket";
import Validate from "./pages/Validate";

// IMPROV:
// 1. Admin flow
//    - auth
//    - create events
//    - delete events
//    - update events

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="events" element={<EventPage />} />
        <Route path="validate" element={<Validate />} />
        <Route path="events/:eventId" element={<EventDetailsPage />} />
        <Route path="events/:eventId/register" element={<Register />} />
        <Route path="events/:eventId/ticket" element={<Ticket />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
