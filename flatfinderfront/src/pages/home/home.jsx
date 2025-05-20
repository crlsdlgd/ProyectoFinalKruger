import Footer from "../../components/footer/footer";
import "../pages.css";
import FlatFilter from "../../components/flat-filter/flatFilter";
import FlatList from "../../components/flat-list/flatList";
import { NavBar } from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import { FlatService } from "../../services/FlatService";
const Home = () => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFlats();
  }, []);

  // useEffect(() => {
  //   console.log("Flats loaded:", flats);
  // }, [flats]);

  const loadFlats = async () => {
    const flatService = new FlatService();
    const data = await flatService.getAllFlats();
    setFlats(data);
    setLoading(false);
  };

  return (
    <div className="page-wrapper dark:bg-bgdark bg-bglight">
      <div>
        <NavBar />
      </div>
      <main>
        <section>
          <FlatFilter />
        </section>
        <section>
          {loading ? <p>Loading flats...</p> : <FlatList flats={flats} />}
        </section>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
