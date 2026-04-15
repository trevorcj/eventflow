import { IoFilterOutline } from "react-icons/io5";

function Filter({ activeTab, setActiveTab }) {
  function handleChange(tabName) {
    setActiveTab(activeTab === tabName ? null : tabName);
  }

  return (
    <div className="flex items-center gap-4 text-sm font-semibold">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <IoFilterOutline />
        <span>Filters</span>
      </div>
      <div className="bg-gray/5 space-x-2 rounded-lg border border-gray/10 ">
        <button
          onClick={() => handleChange("online")}
          className={`cursor-pointer rounded-tl-lg rounded-bl-lg p-2 ${activeTab === "online" ? "bg-tetiary text-accent" : ""}`}>
          Online
        </button>
        <button
          onClick={() => handleChange("physical")}
          className={`cursor-pointer rounded-tr-lg rounded-br-lg  p-2 ${activeTab === "physical" ? "bg-tetiary text-accent" : ""}`}>
          Physical
        </button>
      </div>
    </div>
  );
}

export default Filter;
