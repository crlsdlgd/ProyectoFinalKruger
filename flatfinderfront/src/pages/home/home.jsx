import Footer from "../../components/footer/footer";
import "../pages.css";
import FlatFilter from "../../components/flat-filter/flatFilter";
import FlatList from "../../components/flat-list/flatList";
import { NavBar } from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import { FlatService } from "../../services/FlatService";
import { PaginationFilter } from "../../components/paginationFilter/paginationFilter";

const Home = () => {
  const [flats, setFlats] = useState([]);
  const [loadingFlats, setLoadingFlats] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [searchFilters, setSearchFilters] = useState(""); //Estos filtros estan encargados de filtar de busqueda (ciudad, area, precio, sort, acsDesc)
  const [paginationFilter, setPaginationFilter] = useState(""); // Este filtro se encarga de la paginacion
  const [globalFilters, setGlobalFilters] = useState(""); // Este filtro se encarga de adjuntar los filtros de paginacion y los filtros de busqueda
  const [cities, setCities] = useState([]);

  useEffect(() => {
    loadFlats(globalFilters);
  }, [globalFilters]);

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
    const data = await flatService.getAllFlats(filters);
    setFlats(data);
    setLoadingFlats(true);
  };

  const loadFlatsCities = async () => {
    const flatService = new FlatService();
    const data = await flatService.getFlatCities();
    setCities(data);
    setLoadingCities(true);
  };

  return (
    <div className="page-wrapper dark:bg-bgdark bg-bglight">
      <div>
        <NavBar />
      </div>
      <main>
        <section>
          {loadingCities && (
            <FlatFilter cities={cities} setSearchFilters={setSearchFilters} />
          )}
        </section>
        <section>
          {loadingFlats && (
            <>
              <FlatList flats={flats.items} />
              <div className="flex justify-center mt-1">
                <PaginationFilter
                  totalPages={flats.pages}
                  setPaginationFilter={setPaginationFilter}
                />
              </div>
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
