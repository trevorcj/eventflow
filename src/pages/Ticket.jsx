import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { FaChevronLeft } from "react-icons/fa6";

function Ticket() {
  const location = useLocation();
  const { ticketId } = location.state;

  return (
    <>
      <button
        type="button"
        className="group flex items-center gap-2 font-bold text-tetiary cursor-pointer mt-8 pl-6 mb-4 ">
        <FaChevronLeft className="" />
        <Link to="/events">Go to events</Link>
      </button>

      <div className="text-center mt-10">
        <div className="text-4xl mb-4">🎉</div>
        <h2 className="text-2xl font-black tracking-tight text-tetiary mb-2">
          Thank you!
        </h2>
        <p className="text-gray/80 text-sm">
          Your ticket has been issued successfully
        </p>
      </div>

      <div className="flex items-center justify-center mt-10">
        <div className="w-full bg-white max-w-sm overflow-hidden relative font-sans">
          <div className="flex justify-center w-full py-8">
            <img src={Logo} alt="Eventflow logo" width={24} />
          </div>
          <p className="text-sm text-gray/50 text-center mb-6">
            Register for more events on eventflow
          </p>

          <div className="relative flex items-center px-4">
            <div className="absolute -left-3 w-6 h-6 bg-accent rounded-full"></div>
            <div className="w-full border-t border-dashed border-gray/10"></div>
            <div className="absolute -right-3 w-6 h-6 bg-accent rounded-full"></div>
          </div>

          <div className=" px-4 py-6 space-y-6 text-center">
            <p className="font-semibold text-sm uppercase text-tetiary">{`EVF-${ticketId}`}</p>
          </div>

          <div className="relative mt-10">
            <div className="absolute bottom-0 w-full flex justify-between px-1 translate-y-1/2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-accent rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ticket;
