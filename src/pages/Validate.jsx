import { useState } from "react";
import manta from "../services/manta";

import Button from "../ui/Button";
import Navigation from "../ui/Navigation";
import { sileo } from "sileo";
import EventCard from "../ui/EventCard";

function Validate() {
  const [ticketId, setTicketId] = useState("");
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState();
  const [attendee, setAttendee] = useState();

  async function handleValidateTicket(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await manta.fetchOneRecord({
        table: "registrations",
        where: { ticket_id: ticketId },
        with: {
          events: {
            fields: ["title", "date", "location", "image", "featured", "id"],
            on: {
              from: "event_id",
              to: "id",
            },
          },
        },
      });

      const record = res?.data?.data;
      if (!record) {
        sileo.error({ title: "Ticket not found" });
        return;
      }

      sileo.success({ title: "Ticket validated successfully" });
      setEvent(record?.events[0]);
      setAttendee(record);

      setTicketId("");
    } catch (err) {
      sileo.error({ title: "Something went wrong" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className=" bg-primary/5">
        <Navigation />

        <div className="flex flex-col items-center pt-40 pb-20 gap-7 text-center mx-8 -z-10">
          <h1 className="text-4xl font-black tracking-tight text-tetiary">
            Validate ticket
          </h1>
          <p className="text-gray">Enter a ticket ID to validate</p>

          <form
            className="flex flex-wrap items-center justify-center gap-4"
            onSubmit={handleValidateTicket}>
            <input
              className="w-sm sm:w-md px-5 py-4 text-sm rounded-full border border-gray/50 outline-0 "
              type="text"
              name=""
              placeholder="Ticket ID (EVF...)"
              onChange={(e) => setTicketId(e.target.value)}
              value={ticketId.toUpperCase()}
              required
            />
            <Button
              className={`flex gap-2 items-center ${loading ? "bg-gray/20! disabled:cursor-not-allowed" : ""}`}
              disabled={loading}>
              {loading ? "Validating" : "Validate"}
            </Button>
          </form>
        </div>
      </header>

      {event && attendee && (
        <div className="max-w-md mx-auto my-8">
          <h2 className="text-2xl text-center mb-4 font-black tracking-tight text-tetiary">
            Attendee details
          </h2>
          <div className="flex justify-center mb-8">
            <code className="text-[12px] px-3 py-1  text-gray/50 rounded-lg border border-gray/5 font-mono tracking-wider">
              {attendee.ticket_id}
            </code>
          </div>

          <hr className="border-gray/8" />
          <br />
          <div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-6">
              <input
                className="ticket-input border-gray/5 text-gray disabled:cursor-not-allowed"
                type="text"
                value={attendee.first_name}
                name="firstname"
                disabled
              />

              <input
                className="ticket-input border-gray/5 text-gray disabled:cursor-not-allowed"
                type="text"
                value={attendee.last_name}
                name="lastname"
                disabled
              />

              <input
                className="ticket-input border-gray/5 text-gray disabled:cursor-not-allowed"
                type="text"
                value={attendee.email}
                name="email"
                disabled
              />

              <input
                className="ticket-input border-gray/5 text-gray disabled:cursor-not-allowed"
                type="text"
                value={`${attendee.quantity} ticket(s)`}
                name="tickets"
                disabled
              />
            </div>
          </div>

          <EventCard
            key={event.id}
            id={event.id}
            image={event.image}
            title={event.title}
            date={event.date}
            location={event.location}
            featured={JSON.parse(event.featured)}
          />
        </div>
      )}
    </>
  );
}

export default Validate;
