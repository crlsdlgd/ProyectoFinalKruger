import Footer from "../../components/footer/footer";
import "../pages.css";
import FlatFilter from "../../components/flat-filter/flatFilter";
import FlatList from "../../components/flat-list/flatList";
import { NavBar } from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import { FlatService } from "../../services/FlatService";
const Home = () => {
  const [flats, setFlats] = useState([]);
  const [loadingFlats, setLoadingFlats] = useState(true);
  const [loadingCities, setLoadingCities] = useState(true);
  const [filters, setFilters] = useState("");
  const [cities, setCities] = useState(["Madrid", "Barcelona"]);

  useEffect(() => {
    loadFlats(filters);
  }, [filters]);

  useEffect(() => {
    loadFlatsCities();
  }, []);

  const loadFlats = async (filters) => {
    const flatService = new FlatService();
    const data = await flatService.getAllFlats(filters);
    setFlats(data);
    setLoadingFlats(false);
  };

  const loadFlatsCities = async () => {
    const flatService = new FlatService();
    const data = await flatService.getFlatCities();
    setCities(data);
    setLoadingCities(false);
  };

  return (
    <div className="page-wrapper dark:bg-bgdark bg-bglight">
      <div>
        <NavBar />
      </div>
      <main>
        <section>
          {loadingCities ? (
            <p>Loading cities...</p>
          ) : (
            <FlatFilter cities={cities} setFilters={setFilters} />
          )}
        </section>
        <section>
          {loadingFlats ? <p>Loading flats...</p> : <FlatList flats={flats} />}
        </section>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
