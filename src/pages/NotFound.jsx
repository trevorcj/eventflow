import useMoveBack from "../hooks/useMoveBack";
import Navigation from "../ui/Navigation";
import { FaChevronLeft } from "react-icons/fa6";

function NotFound() {
  const moveBack = useMoveBack();

  return (
    <>
      <Navigation />
      <main className="flex flex-col mt-40 text-center gap-6 items-center justify-center">
        <h1 className="text-4xl font-black tracking-tight text-tetiary">
          This page looks empty
        </h1>
        <p className="text-gray">Did you get the location right?</p>
        <button
          type="button"
          className="group flex items-center gap-2 font-bold text-tetiary cursor-pointer"
          onClick={moveBack}>
          <FaChevronLeft className="" />
          Go back
        </button>
      </main>
    </>
  );
}

export default NotFound;
