import EventCard from "./EventCard";

function CardGrid({ children }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{children}</div>
  );
}

export default CardGrid;
