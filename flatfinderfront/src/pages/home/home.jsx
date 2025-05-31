import Footer from "../../components/footer/footer";
import "../pages.css";
import FlatFilter from "../../components/flat-filter/flatFilter";
import FlatList from "../../components/flat-list/flatList";
import { NavBar } from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import { FlatService } from "../../services/FlatService";
import { Pagination } from "@heroui/react";
const Home = () => {
  const [flats, setFlats] = useState([]);
  const [loadingFlats, setLoadingFlats] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingTotalPages, setLoadingTotalPages] = useState(false);
  const [filters, setFilters] = useState("");
  const [cities, setCities] = useState(["Madrid", "Barcelona"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadFlats(filters);
  }, [filters]);

  useEffect(() => {
    loadFlatsCities();
    loadTotalPages();
  }, []);

  // useEffect(() => {
  //   console.log(totalPages);
  // }, [totalPages]);

  const loadFlats = async (filters) => {
    const flatService = new FlatService();
    const data = await flatService.getAllFlats(filters);
    setFlats(data);
    setLoadingFlats(true);
  };

  const loadTotalPages = async () => {
    const flatService = new FlatService();
    const tPages = await flatService.getTotalPages();
    setTotalPages(tPages);
    setLoadingTotalPages(true);
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
            <FlatFilter cities={cities} setFilters={setFilters} />
          )}
        </section>
        <section>
          {loadingFlats && <FlatList flats={flats} />}
          {loadingTotalPages && (
            <div className="flex justify-center mt-1">
              <Pagination
                currentPage={currentPage}
                total={totalPages}
                initialPage={1}
                onChange={setCurrentPage}
              />
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
