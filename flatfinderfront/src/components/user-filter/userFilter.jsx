import { useState } from "react";
import "./userFilter.css";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { ArrowDownIcon } from "../icons/arrowDownIcon";
import { getDateYearsAgo } from "../../utils/utils";
import { ArrowUpIcon } from "../icons/arrowUpIcon";

const UserFilter = ({ setSearchFilters }) => {
  const [sortBy, setSortBy] = useState("firstname");
  const [ascDesc, setAscDesc] = useState("asc");
  const [minAgeFilter, setMinAgeFilter] = useState(null);
  const [maxAgeFilter, setMaxAgeFilter] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let filters = "";
    if (minAgeFilter) {
      filters += `birthdate[lte]=${getDateYearsAgo(minAgeFilter)}&`;
    }
    if (maxAgeFilter) {
      filters += `birthdate[gte]=${getDateYearsAgo(maxAgeFilter)}&`;
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
    setSortBy("firstname");
    setAscDesc("asc");
    setMinAgeFilter("");
    setMaxAgeFilter("");
  };

  return (
    <div className="flat-filter-container">
      <form onSubmit={handleSubmit}>
        <div className="user-filter-wrapper">
          <div className="user-filter-age">
            <label className="text-txtlight dark:text-txtdark">
              Filter by Age
            </label>
            <div className="user-filter-inputs">
              <Input
                type="number"
                value={minAgeFilter}
                onChange={(e) => setMinAgeFilter(e.target.value)}
                placeholder="Min Age"
                label="Min Age"
                className="text-txtlight dark:text-txtdark"
              />
              <Input
                type="number"
                value={maxAgeFilter}
                onChange={(e) => setMaxAgeFilter(e.target.value)}
                placeholder="Max Age"
                label="Max Age"
                className="text-txtlight dark:text-txtdark"
              />
            </div>
          </div>
          <div className="user-filter-sort">
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
                    value="firstname"
                    key="firstname"
                    className="text-txtlight dark:text-txtdark"
                  >
                    First Name
                  </SelectItem>
                  <SelectItem
                    value="lastname"
                    key="lastname"
                    className="text-txtlight dark:text-txtdark"
                  >
                    Last Name
                  </SelectItem>
                  <SelectItem
                    value="birthdate"
                    key="birthdate"
                    className="text-txtlight dark:text-txtdark"
                  >
                    Age
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

export default UserFilter;
