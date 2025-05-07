import { useEffect, useState } from "react";
import arrow from "../Assets/arrow.svg";

function Category({ categories, onFilterChange }) {
  const [openCategories, setOpenCategories] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});

  // 1. Retrieve stored filters on component mount
  useEffect(() => {
    const savedFilters = localStorage.getItem("filters");
    if (savedFilters) {
      setSelectedFilters(JSON.parse(savedFilters));
    }
  }, []);

  const toggleCategory = (index) => {
    setOpenCategories((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCheckboxChange = (categoryName, item, checked) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (!newFilters[categoryName]) {
        newFilters[categoryName] = [];
      }

      if (checked) {
        newFilters[categoryName] = [...newFilters[categoryName], item];
      } else {
        newFilters[categoryName] = newFilters[categoryName].filter(
          (i) => i !== item
        );
      }

      if (newFilters[categoryName].length === 0) {
        delete newFilters[categoryName];
      }

      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    onFilterChange({});
    localStorage.removeItem("filters");
  };

  return (
    <div className="w-[24rem] ml-2">
      <div className="flex justify-between items-center my-3">
        <p className="font-medium">Applied Filters</p>
        <p className="text-blue-600 cursor-pointer" onClick={clearAllFilters}>
          Clear all
        </p>
      </div>
      {/* {selectedFilters.map((name, index) => {
        <p class="inline-block bg-gray-200 px-2 py-1 mx-1" key={index}>
          {name}
        </p>;
      })} */}
      {/* {Object.entries(localStorage.getItem("filters")).map(
        ([category, items]) =>
          items.map((item, index) => (
            <p
              key={`${category}-${index}`}
              className="inline-block bg-gray-200 px-2 py-1 mx-1 rounded-md text-sm"
            >
              {`${item}`}
            </p>
          ))
      )} */}
      {(() => {
        const filters = localStorage.getItem("filters");
        if (!filters) return null;

        try {
          const parsedFilters = JSON.parse(filters);
          return Object.entries(parsedFilters).map(([category, items]) =>
            items.map((item, index) => (
              <p
                key={`${category}-${index}`}
                className="inline-block bg-gray-200 px-2 py-1 mx-1 rounded-md text-sm"
              >
                {`${item}`}
              </p>
            ))
          );
        } catch (error) {
          console.error("Error parsing filters from localStorage:", error);
          return null;
        }
      })()}
      <span className="block border-b border-gray-300 my-2"></span>
      {categories.map((category, index) => (
        <div key={index} className="mt-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleCategory(index)}
          >
            <p className="text-lg font-semibold">{category.name}</p>
            <img
              src={arrow}
              alt="Arrow"
              className={`w-4 h-4 transform transition-transform duration-300 ${
                openCategories[index] ? "rotate-[270deg]" : "rotate-90"
              }`}
            />
          </div>

          {openCategories[index] && (
            <div className="mt-2 space-y-2">
              {category.items.map((item, i) => (
                <label
                  key={i}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={
                      selectedFilters[category.name]?.includes(item) || false
                    }
                    onChange={(e) =>
                      handleCheckboxChange(
                        category.name,
                        item,
                        e.target.checked
                      )
                    }
                  />
                  <span className="text-lg">{item}</span>
                </label>
              ))}
            </div>
          )}
          <span className="block border-b border-gray-300 my-2"></span>
        </div>
      ))}
    </div>
  );
}

export default Category;
