import Footer from "../../components/footer/footer";
import FlatFilter from "../../components/flat-filter/flatFilter";
import FlatList from "../../components/flat-list/flatList";
import FlatCard from "../../components/flat-card/flatCard";
import { NavBar } from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import { FlatService } from "../../services/flatService";
import { PaginationFilter } from "../../components/paginationFilter/paginationFilter";
import { toggleFavorite } from "../../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import "../pages.css";
import "./home.css";
import { GridIcon } from "../../components/icons/gridIcon";
import { ListIcon } from "../../components/icons/listIcon";
import { Button, Tooltip } from "@heroui/react";
import { PlusIcon } from "../../components/icons/plusIcon";

const Home = () => {
  const [flats, setFlats] = useState([]);
  const [loadingFlats, setLoadingFlats] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingPages, setLoadingPages] = useState(false); // Este loading es para la paginacion
  const [searchFilters, setSearchFilters] = useState(""); //Estos filtros estan encargados de filtar de busqueda (ciudad, area, precio, sort, acsDesc)
  const [paginationFilter, setPaginationFilter] = useState(""); // Este filtro se encarga de la paginacion
  const [globalFilters, setGlobalFilters] = useState(""); // Este filtro se encarga de adjuntar los filtros de paginacion y los filtros de busqueda
  const [cities, setCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("grid"); // Estado para el modo de vista (lista o cuadrícula)
  const [userLogged, setUserLogged] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    loadFlats(globalFilters);
  }, [userLogged]);

  useEffect(() => {
    loadFlats(globalFilters);
  }, [globalFilters]);

  useEffect(() => {
    setLoadingPages(true);
    setCurrentPage(1);
    setPaginationFilter("&page=1");
    setTimeout(() => {
      setLoadingPages(false);
    }, 100);
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

  useEffect(() => {
    loadFlatsCities();
  }, []);

  const loadFlats = async (filters) => {
    const flatService = new FlatService();
    const data = await flatService.getAllFlats(filters, pathname);

    data.items = data.items.map((flat) => ({
      ...flat,
      isFavorite: userLogged?.favoriteFlatIds?.includes(flat._id) || false,
    }));

    setFlats(data);
    setLoadingFlats(true);
  };

  const loadFlatsCities = async () => {
    const flatService = new FlatService();
    const data = await flatService.getFlatCities();
    setCities(data);
    setLoadingCities(true);
  };

  const handleFavorite = async (flatId) => {
    toggleFavorite(flatId, setUserLogged);
  };

  return (
    <div className="page-wrapper dark:bg-bgdark bg-bglight">
      <div>
        <NavBar />
      </div>
      <main>
        <h3 className="text-center text-xl font-bold mt-2 mb-2 text-txtlight dark:text-txtdark">
          {pathname === "/" && "Home"}
          {pathname === "/my-flats" && "My Flats"}
          {pathname === "/favorites" && "Favorites"}
        </h3>
        <section>
          {loadingCities && (
            <div className="flex justify-center mt-1 w-full min-w-full">
              <FlatFilter cities={cities} setSearchFilters={setSearchFilters} />
            </div>
          )}
        </section>
        <section>
          {loadingFlats && (
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
              {view === "list" ? (
                <FlatList flats={flats.items} handleFavorite={handleFavorite} />
              ) : (
                <div className="grid-view-container">
                  {flats.items.map((flat) => (
                    <FlatCard flat={flat} handleFavorite={handleFavorite} />
                  ))}
                </div>
              )}
              {!loadingPages && (
                <div className="flex justify-center mt-1">
                  <PaginationFilter
                    totalPages={flats.pages}
                    setPaginationFilter={setPaginationFilter}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
          {pathname == "/my-flats" && (
            <div className="flex justify-end items-center mb-2 mr-10">
              <Tooltip
                content="New Flat"
                className="hover:cursor-pointer"
                placement="top"
                color="secondary"
                delay={1000}
                showArrow
              >
                <Button
                  className="p-0 w-10 min-w-10 rounded-full"
                  color="success"
                  onPress={() => navigate("/new-flat")}
                >
                  <PlusIcon className="text-txtdark" />
                </Button>
              </Tooltip>
            </div>
          )}
        </section>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
