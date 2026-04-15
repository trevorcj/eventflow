import { Link } from "react-router-dom";
import events from "../../events.json";

import Navigation from "../ui/Navigation";
import Button from "../ui/Button";
import CardGrid from "../ui/CardGrid";
import EventCard from "../ui/EventCard";

function HomePage() {
  return (
    <>
      <header className=" bg-primary/5">
        <Navigation />

        <div className="flex flex-col items-center pt-40 pb-20 gap-7 text-center mx-7 ">
          <h1 className="text-4xl font-black tracking-tight text-tetiary">
            Where every moment finds its flow
          </h1>
          <p className="text-gray">
            Discover a kinetic collection of exclusive gatherings
          </p>

          <div className="flex flex-col gap-3">
            <Button link="/events">Explore all events</Button>
            <Button
              className="bg-transparent text-tetiary! border border-tetiary"
              link="/validate">
              Validate ticket
            </Button>
          </div>
        </div>
      </header>

      <FeaturedEvents />
    </>
  );
}

function FeaturedEvents() {
  const featuredEvents = events.filter((event) => event.featured);

  return (
    <section className="my-8 px-6 lg:px-20">
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-xl font-bold tracking-tight text-tetiary">
          Featured events
        </h2>

        <Link
          to="/events"
          className="relative inline-flex items-center text-sm font-semibold text-gray transition-colors duration-500 hover:text-tetiary after:absolute after:right-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:content-[''] after:transition-transform after:duration-500 hover:after:scale-x-100">
          <span>Discover more events</span>
        </Link>
      </div>

      <CardGrid>
        {featuredEvents.length > 0 ? (
          featuredEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              image={event.image}
              title={event.title}
              date={event.date}
              location={event.location}
              featured={event.featured}
            />
          ))
        ) : (
          <p></p>
        )}
      </CardGrid>
    </section>
  );
}

export default HomePage;
