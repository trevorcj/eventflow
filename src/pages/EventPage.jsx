import { useState } from "react";
import events from "../../events.json";

import Navigation from "../ui/Navigation";
import CardGrid from "../ui/CardGrid";
import Filter from "../ui/Filter";
import Search from "../ui/Search";
import EventCard from "../ui/EventCard";
import useDebounce from "../hooks/useDebounce";

function EventPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState(null);

  const debouncedSearchTerm = useDebounce(query, 500);

  const filteredEvents = events.filter((event) => {
    const matchesType = activeTab ? event.type === activeTab : true;
    const matchesQuery = debouncedSearchTerm
      ? event.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      : true;

    return matchesType && matchesQuery;
  });

  return (
    <>
      <header className="pt-25">
        <Navigation />
      </header>

      <main className="px-6 lg:px-20 mb-8">
        <Search query={query} setQuery={setQuery} />
        <div className="flex justify-between items-center my-4 ">
          <h2 className="text-xl font-bold tracking-tight text-tetiary">
            {query ? `"${query}" events` : "All events"}
          </h2>

          <Filter activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <CardGrid>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
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
            <p>No results found.</p>
          )}
        </CardGrid>
      </main>
    </>
  );
}

export default EventPage;
