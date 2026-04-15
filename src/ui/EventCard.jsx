import { Link } from "react-router-dom";
import useFormatDate from "../hooks/useFormatDate";
import { FaRegClock, FaLocationArrow } from "react-icons/fa6";

function EventCard({ title, date, location, image, featured, id }) {
  return (
    <Link to={`/events/${id}`}>
      <div className="border border-transparent hover: hover:border-gray/5 hover:bg-white rounded-md duration-200 transition-all cursor-pointer relative overflow-hidden">
        {featured && (
          <span className="uppercase font-semibold bg-primary text-accent text-sm py-1.5 px-2 rounded-md absolute right-2 top-2">
            Featured
          </span>
        )}
        <div className="h-50 overflow-hidden md:h-40">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="block h-full w-full object-cover object-center"
          />
        </div>

        <div className="flex flex-col space-y-6 px-4 py-6">
          <h3 className="text-lg font-semibold tracking-tight text-tetiary ">
            {title}
          </h3>

          <span className="event-details mb-2 text-gray/80">
            <FaRegClock className="fill-primary" />
            {useFormatDate(date)}
          </span>
          <span className="event-details text-gray/80">
            <FaLocationArrow className="fill-primary" />
            {location}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
