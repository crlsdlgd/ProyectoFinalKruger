import { Select, SelectItem, Input, Button } from "@heroui/react";
import { useState } from "react";
import "./flatFilter.css";
const FlatFilter = ({ cities, setFilters }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [minAreaFilter, setMinAreaFilter] = useState("");
  const [maxAreaFilter, setMaxAreaFilter] = useState("");
  const [minRentFilter, setMinRentFilter] = useState("");
  const [maxRentFilter, setMaxRentFilter] = useState("");
  const [sortBy, setSortBy] = useState("city");
  const [ascDesc, setAscDesc] = useState("asc");

  const handleSubmit = (e) => {
    e.preventDefault();
    let filters = "";
    if (selectedCity) {
      filters += `city=${selectedCity}&`;
    }
    if (minAreaFilter) {
      filters += `areaSize[gte]=${minAreaFilter}&`;
    }
    if (maxAreaFilter) {
      filters += `areaSize[lte]=${maxAreaFilter}&`;
    }
    if (minRentFilter) {
      filters += `rentPrice[gte]=${minRentFilter}&`;
    }
    if (maxRentFilter) {
      filters += `rentPrice[lte]=${maxRentFilter}&`;
    }
    if (sortBy) {
      if (ascDesc === "asc") {
        filters += `sort=${sortBy}`;
      } else {
        filters += `sort=-${sortBy}`;
      }
    }
    if (filters) {
      filters = "?" + filters;
    }
    if (filters.endsWith("&")) {
      filters = filters.slice(0, -1);
    }
    console.log("Filters submitted:", filters);
    setFilters(filters);
  };

  const resetFilters = () => {
    setSelectedCity("");
    setMinAreaFilter("");
    setMaxAreaFilter("");
    setMinRentFilter("");
    setMaxRentFilter("");
    setSortBy("city");
    setAscDesc("asc");
  };
  return (
    <div className="flat-filter-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flat-filter-wrapper">
          <div className="flat-filter-city">
            <label htmlFor="city" className="text-txtlight dark:text-txtdark">
              Filter by city
            </label>
            <Select
              label="Select a city"
              placeholder="Select a city"
              selectedKeys={selectedCity ? [selectedCity] : []}
            >
              {cities.map((city) => (
                <SelectItem
                  key={city}
                  value={city}
                  onClick={() => {
                    setSelectedCity(city);
                  }}
                  className="text-txtlight dark:text-txtdark"
                >
                  {city}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flat-filter-area">
            <label className="text-txtlight dark:text-txtdark">
              Filter by Area
            </label>
            <div className="flat-filter-inputs">
              <Input
                type="number"
                value={minAreaFilter}
                onChange={(e) => setMinAreaFilter(e.target.value)}
                placeholder="Min Area"
                label="Min Area"
                className="text-txtlight dark:text-txtdark"
              />
              <Input
                type="number"
                value={maxAreaFilter}
                onChange={(e) => setMaxAreaFilter(e.target.value)}
                placeholder="Max Area"
                label="Max Area"
                className="text-txtlight dark:text-txtdark"
              />
            </div>
          </div>
          <div className="flat-filter-rent">
            <label className="text-txtlight dark:text-txtdark">
              Filter by Rent Price
            </label>
            <div className="flat-filter-inputs">
              <Input
                type="number"
                value={minRentFilter}
                onChange={(e) => setMinRentFilter(e.target.value)}
                placeholder="Min Rent"
                label="Min Rent"
                className="text-txtlight dark:text-txtdark"
              />
              <Input
                type="number"
                value={maxRentFilter}
                onChange={(e) => setMaxRentFilter(e.target.value)}
                placeholder="Max Rent"
                label="Max Rent"
                className="text-txtlight dark:text-txtdark"
              />
            </div>
          </div>
          <div className="flat-filter-buttons">
            <Button type="submit">Apply Filters</Button>
            <Button type="button" onPress={() => resetFilters()}>
              Reset Filters
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FlatFilter;
