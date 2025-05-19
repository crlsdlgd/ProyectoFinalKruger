import Footer from "../../components/footer/footer";
import "../pages.css";
import FlatFilter from "../../components/flat-filter/flatFilter";
import FlatList from "../../components/flat-list/flatList";
import { NavBar } from "../../components/navbar/navbar";
const Home = () => {
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
          <FlatList />
        </section>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
