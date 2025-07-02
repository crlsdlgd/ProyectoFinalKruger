import { Select, SelectItem, Input, Button } from "@heroui/react";
import { useState } from "react";
import "./flatFilter.css";
import { ArrowUpIcon } from "../icons/arrowUpIcon";
import { ArrowDownIcon } from "../icons/arrowDownIcon";
const FlatFilter = ({ cities, setSearchFilters }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [minAreaFilter, setMinAreaFilter] = useState("");
  const [maxAreaFilter, setMaxAreaFilter] = useState("");
  const [minRentFilter, setMinRentFilter] = useState("");
  const [maxRentFilter, setMaxRentFilter] = useState("");
  const [sortBy, setSortBy] = useState("rentPrice");
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
    setSearchFilters(filters);
  };

  const resetFilters = () => {
    setSelectedCity("");
    setMinAreaFilter("");
    setMaxAreaFilter("");
    setMinRentFilter("");
    setMaxRentFilter("");
    setSortBy("rentPrice");
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
          <div className="flat-filter-sort">
            <label className="text-txtlight dark:text-txtdark">Sort by</label>
            <div>
              <div className="sort-select">
                <Select
                  label="Sort by"
                  placeholder="Select sort option"
                  selectedKeys={sortBy ? [sortBy] : []}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <SelectItem
                    value="city"
                    key="city"
                    className="text-txtlight dark:text-txtdark"
                  >
                    City
                  </SelectItem>
                  <SelectItem
                    value="areaSize"
                    key="areaSize"
                    className="text-txtlight dark:text-txtdark"
                  >
                    Area Size
                  </SelectItem>
                  <SelectItem
                    value="rentPrice"
                    key="rentPrice"
                    className="text-txtlight dark:text-txtdark"
                  >
                    Rent Price
                  </SelectItem>
                </Select>
              </div>
              <div className="sort-order-toggle">
                <Button
                  variant="faded"
                  className="min-w-5 m-0 p-0 w-10 size-14"
                  onPress={() => setAscDesc(ascDesc === "asc" ? "desc" : "asc")}
                >
                  {ascDesc === "asc" ? <ArrowDownIcon /> : <ArrowUpIcon />}
                </Button>
              </div>
            </div>
          </div>
          <div className="flat-filter-buttons">
            <Button
              type="submit"
              variant="solid"
              color="primary"
              className="text-txtdark"
            >
              Apply Filters
            </Button>
            <Button
              variant="bordered"
              className="text-txtlight dark:text-txtdark"
              onPress={resetFilters}
            >
              Clean Filters
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FlatFilter;
