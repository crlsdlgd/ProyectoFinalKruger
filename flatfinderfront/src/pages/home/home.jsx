import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import "../pages.css";
import FlatFilter from "../../components/flat-filter/flatFilter";
import FlatList from "../../components/flat-list/flatList";
const Home = () => {
  return (
    <div className="page-wrapper dark:bg-slate-900">
      <div>
        <Header />
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
