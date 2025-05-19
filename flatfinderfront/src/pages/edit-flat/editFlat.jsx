import Footer from "../../components/footer/footer";
import "../pages.css";
import { NavBar } from "../../components/navbar/navbar";

const EditFlat = () => {
  return (
    <div className="page-wrapper">
      <div>
        <NavBar />
      </div>
      <main>
        <p>Aqui va el contenido de edit flat</p>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default EditFlat;
