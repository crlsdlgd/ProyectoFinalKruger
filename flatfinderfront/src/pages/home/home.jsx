import Footer from "../../components/footer/footer";
import "../pages.css";
import FlatFilter from "../../components/flat-filter/flatFilter";
import FlatList from "../../components/flat-list/flatList";
import { NavBar } from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import { FlatService } from "../../services/FlatService";
import { PaginationFilter } from "../../components/paginationFilter/paginationFilter";
import { toggleFavorite } from "../../utils/utils";
import { useLocation } from "react-router-dom";

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
  const [userLogged, setUserLogged] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });
  const pathname = useLocation().pathname;

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
              <FlatList flats={flats.items} handleFavorite={handleFavorite} />
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
        </section>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
