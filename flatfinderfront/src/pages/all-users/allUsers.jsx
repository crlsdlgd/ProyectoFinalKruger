import Footer from "../../components/footer/footer";
import "../pages.css";
import { NavBar } from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import { UserService } from "../../services/userService";
import { Button } from "@heroui/react";
import { GridIcon } from "../../components/icons/gridIcon";
import { ListIcon } from "../../components/icons/listIcon";
import { PaginationFilter } from "../../components/paginationFilter/paginationFilter";
import UserList from "../../components/user-list/userList";
import UserCard from "../../components/user-card/userCard";
import UserFilter from "../../components/user-filter/userFilter";

const AllUsers = () => {
  const [users, setUsers] = useState({});
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [searchFilters, setSearchFilters] = useState("");
  const [paginationFilter, setPaginationFilter] = useState("");
  const [globalFilters, setGlobalFilters] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("grid");
  const [loadingPages, setLoadingPages] = useState(false);

  useEffect(() => {
    loadUsers(globalFilters);
  }, [globalFilters]);

  const loadUsers = async (filters) => {
    const userService = new UserService();
    const data = await userService.getAllUsers(filters);
    setUsers(data);
    setLoadingUsers(true);
  };

  useEffect(() => {
    setLoadingPages(true);
    setCurrentPage(1);
    setPaginationFilter("&page=1");
    setTimeout(() => {
      setLoadingPages(false);
    }, 1000);
  }, [searchFilters]);

  useEffect(() => {
    let filter = searchFilters + paginationFilter;
    if (filter) {
      if (filter.startsWith("&")) {
        filter = filter.slice(1);
      }

      if (filter.endsWith("&")) {
        filter = filter.slice(0, -1);
      }
      filter = "?" + filter;
    }
    setGlobalFilters(filter);
  }, [searchFilters, paginationFilter]);

  return (
    <div className="page-wrapper dark:bg-[url('/assets/inspiration-desing/blurry-gradient-haikei(2).svg')] bg-[url('/assets/inspiration-desing/blurry-gradient-haikei(3).svg')] bg-cover">
      <div>
        <NavBar />
      </div>
      <main>
        <h3 className="text-center text-xl font-bold mt-2 mb-2 text-txtlight dark:text-txtdark">
          All Users
        </h3>
        <section>
          <UserFilter setSearchFilters={setSearchFilters} />
        </section>
        <section>
          {loadingUsers && (
            <>
              <div className="flex justify-end items-center mb-2 mr-10">
                <span className="text-txtlight dark:text-txtdark mr-2">
                  View
                </span>
                {view === "list" ? (
                  <Button
                    className="m-0 p-0 w-10 min-w-10 rounded-full "
                    onPress={() => setView("grid")}
                  >
                    <GridIcon className="text-txtlight dark:text-txtdark" />
                  </Button>
                ) : (
                  <Button
                    className="m-0 p-0 w-10 min-w-10 rounded-full "
                    onPress={() => setView("list")}
                  >
                    <ListIcon className="text-txtlight dark:text-txtdark" />
                  </Button>
                )}
              </div>
              <div>
                {view === "list" ? (
                  <UserList users={users.items} />
                ) : (
                  <div className="grid-view-container">
                    {users.items.map((user) => (
                      <UserCard key={user._id} user={user} />
                    ))}
                  </div>
                )}
              </div>
              {!loadingPages && (
                <div className="flex justify-center mt-1 mb-4">
                  <PaginationFilter
                    totalPages={users.pages}
                    setPaginationFilter={setPaginationFilter}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AllUsers;
