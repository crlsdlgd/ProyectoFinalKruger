import Footer from "../../components/footer/footer";
import "../pages.css";
import { NavBar } from "../../components/navbar/navbar";

const Favorites = () => {
  return (
    <div className="page-wrapper">
      <div>
        <NavBar />
      </div>
      <main>
        <p>Aqui va el contenido de favorites</p>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Favorites;
