import filterImg from "../Assets/filter.svg";
function FilterSectionServices({ children }) {
  return (
    <div className="flex flex-col max-w-[25rem] ">
      <div className="w-[20rem] flex flex-row">
        <img src={filterImg} alt="" className="mt-2 mr-3 h-[2.5rem]" />
        <label className="text-[2.5rem] bolder-1">Filters</label>
      </div>
      {children}
    </div>
  );
}

export default FilterSectionServices;
