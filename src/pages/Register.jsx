import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../ui/Navigation";
import manta from "../services/manta";
import useMoveBack from "../hooks/useMoveBack";

import { FaChevronLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import Loader from "../ui/Loader";

function Register() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  // Input states
  const [count, setCount] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const ticketId = crypto.randomUUID();

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");

    try {
      await manta.createRecords({
        table: "registrations",
        data: [
          {
            firstName,
            lastName,
            eventId,
            email,
            quantity: count,
            createdAt: new Date().toISOString(),
            ticketId: `EVF-${ticketId}`,
          },
        ],
      });

      setSubmitSuccess("Your registration was submitted successfully.");
      setFirstName("");
      setLastName("");
      setEmail("");
      setCount(1);

      navigate(`/events/${eventId}/ticket`, { state: { ticketId } });
    } catch (err) {
      console.error("Error creating registration", err);
      setSubmitError(err.message || "We could not submit your registration.");
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    async function getEvent() {
      setLoading(true);

      try {
        let { data } = await manta.fetchOneRecord({
          table: "events",
          where: { id: eventId },
        });

        data = data?.data;
        setEvent(data);
      } catch (err) {
        console.error("Error fetching", err);
      } finally {
        setLoading(false);
      }
    }

    getEvent();
  }, [eventId]);

  return (
    <>
      <Navigation />

      <main className="px-6 sm:max-w-lg overflow-y-scroll">
        <button
          type="button"
          className="group flex items-center gap-2 font-bold text-tetiary cursor-pointer mt-20 mb-8 "
          onClick={moveBack}>
          <FaChevronLeft className="" />
          Go back
        </button>

        <h1 className="text-4xl font-black tracking-tight text-tetiary mb-6">
          Get tickets
        </h1>

        {loading ? (
          <Loader />
        ) : (
          <div className="bg-white border border-gray/10 rounded-lg py-6">
            <div className="pb-4 border-b border-b-gray/10 px-4">
              <h2 className="text-lg font-semibold tracking-tight text-gray mb-1">
                {event.title}
              </h2>
              <p className="text-gray/80 ">{event.description}</p>
            </div>

            <div className="flex items-center py-6 border-b border-b-gray/10 px-4 justify-between">
              <p className="font-semibold text-gray uppercase text-sm">
                Number of tickets (MAX 10)
              </p>
              <div className=" px-4 flex gap-4 justify-center items-center">
                <button
                  onClick={() => {
                    count > 1 ? setCount(count - 1) : 1;
                  }}
                  className="ticket-button border border-gray/5 bg-gray/10 text-gray disabled:text-gray/20"
                  disabled={count < 2}>
                  -
                </button>
                <span>{count}</span>
                <button
                  onClick={() => {
                    count < 10 ? setCount(count + 1) : 10;
                  }}
                  className="ticket-button border border-gray/5 bg-gray/10 text-gray disabled:text-gray/20"
                  disabled={count > 9}>
                  +
                </button>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="py-6  px-4 flex flex-col gap-4">
              {submitError ? (
                <p className="rounded-md border border-primary/10 bg-primary/5 px-4 py-3 text-sm text-primary">
                  {submitError}
                </p>
              ) : null}

              {submitSuccess ? (
                <p className="rounded-md border border-gray/10 bg-gray/5 px-4 py-3 text-sm text-gray">
                  {submitSuccess}
                </p>
              ) : null}

              <input
                className="ticket-input border-gray/10 bg-gray/5"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                className="ticket-input border-gray/10 bg-gray/5"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                className="ticket-input border-gray/10 bg-gray/5"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button
                size="sm"
                className="w-full disabled:cursor-not-allowed disabled:opacity-60"
                disabled={submitting}>
                {submitting ? "Submitting..." : "RSVP"}
              </Button>
            </form>
          </div>
        )}
      </main>
    </>
  );
}

export default Register;
