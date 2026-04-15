import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import manta from "../services/manta";

import useFormatDate from "../hooks/useFormatDate";
import useMoveBack from "../hooks/useMoveBack";
import Navigation from "../ui/Navigation";
import Button from "../ui/Button";
import { handleShare } from "../hooks/useShare";
import { FiUsers } from "react-icons/fi";

import { FaChevronLeft, FaLocationArrow, FaRegClock } from "react-icons/fa6";
import { MdOutlineIosShare } from "react-icons/md";
import Loader from "../ui/Loader";
import { sileo } from "sileo";

const url = import.meta.env.VITE_PUBLIC_SITE_URL;

function EventDetailsPage() {
  const { eventId } = useParams();
  const moveBack = useMoveBack();
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attendees, setAttendees] = useState(0);
  const formattedDate = useFormatDate(event?.date);

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
        sileo.error({ title: "Something went wrong" });
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    async function getNumberOfAttendees() {
      try {
        const data = await manta.fetchAllRecords({
          table: "registrations",
          where: { event_id: eventId },
        });

        setAttendees(data?.meta?.total);
      } catch (err) {
        console.error(err.message);
      }
    }

    getEvent();
    getNumberOfAttendees();
  }, [eventId]);

  return (
    <>
      <Navigation />

      <main className="sm:px-6 lg:px-20 overflow-y-scroll">
        <button
          type="button"
          className="group flex items-center gap-2 font-bold text-tetiary cursor-pointer mt-20 mb-5 pl-6 sm:pl-0"
          onClick={moveBack}>
          <FaChevronLeft className="" />
          Go back
        </button>

        {loading ? (
          <Loader />
        ) : (
          <article>
            <div className="w-full h-60 md:h-80 overflow-hidden object-cover sm:rounded-lg relative">
              <span
                className="flex items-center justify-center bg-secondary hover:bg-accent text-accent hover:text-secondary duration-300 transition-all w-10 h-10 rounded-full absolute right-2 top-2 cursor-pointer"
                onClick={() => handleShare(`${url}/events/${eventId}`)}>
                <MdOutlineIosShare />
              </span>
              <img
                src={event.image}
                loading="lazy"
                alt={event.description}
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="mt-8 mb-24 px-6 sm:px-0">
              <h1 className="text-2xl font-black tracking-tight text-tetiary">
                {event.title}
              </h1>

              <div className="mt-6 flex flex-col gap-2">
                <span className="flex items-center gap-2 text-gray">
                  <FaRegClock
                    className="fill-tetiary
                "
                  />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-2  text-gray">
                  <FaLocationArrow
                    className="fill-tetiary
                "
                  />
                  {event.location}
                </span>
              </div>

              <div className="py-8 flex flex-col gap-2 ">
                <h3 className="text-xl font-semibold tracking text-tetiary">
                  Overview
                </h3>
                <p className="text-tetiary text-base">{event.description}</p>
              </div>

              <hr className="border-gray/10" />

              <div className="mt-8 flex gap-2 items-center ">
                <FiUsers
                  className=" stroke-tetiary fill-tetiary
                "
                />
                <p className="text-gray">
                  {attendees} {attendees > 1 ? "people" : ""} RSVP'd
                </p>
              </div>
            </div>
          </article>
        )}
      </main>

      <footer className="fixed bottom-0 z-1000 w-full py-3 px-6 border-t border-t-gray/5 bg-accent flex lg:justify-end">
        <Button
          link={`/events/${eventId}/register`}
          size="sm"
          className="w-full lg:w-sm text-center">
          Get tickets
        </Button>
      </footer>
    </>
  );
}

export default EventDetailsPage;
