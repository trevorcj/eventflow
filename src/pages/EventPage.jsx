import { useEffect, useState } from "react";
import manta from "../services/manta";

import Navigation from "../ui/Navigation";
import CardGrid from "../ui/CardGrid";
import Filter from "../ui/Filter";
import Search from "../ui/Search";
import EventCard from "../ui/EventCard";
import Loader from "../ui/Loader";
import useDebounce from "../hooks/useDebounce";

function EventPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState(null);

  const debouncedSearchTerm = useDebounce(query, 500);

  const whereClause =
    activeTab && activeTab !== "all" ? { type: activeTab } : {};

  useEffect(() => {
    async function getEvents() {
      setLoading(true);

      try {
        const { data } = await manta.fetchAllRecords({
          table: "events",
          where: whereClause,
          fields: [
            "title",
            "featured",
            "id",
            "date",
            "image",
            "location",
            "type",
          ],
          search: {
            columns: ["title"],
            query: debouncedSearchTerm,
          },
        });

        setEvents(data);
      } catch (err) {
        console.error("Error fetching", err);
      } finally {
        setLoading(false);
      }
    }

    getEvents();
  }, [debouncedSearchTerm, activeTab]);

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

        {loading ? (
          <Loader />
        ) : (
          <CardGrid>
            {events.length > 0 ? (
              events.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  image={event.image}
                  title={event.title}
                  date={event.date}
                  location={event.location}
                  featured={JSON.parse(event.featured)}
                />
              ))
            ) : (
              <p>No results found.</p>
            )}
          </CardGrid>
        )}
      </main>
    </>
  );
}

export default EventPage;
