import Footer from "../../components/footer/footer";
import "../pages.css";
import { NavBar } from "../../components/navbar/navbar";

const MyFlats = () => {
  return (
    <div className="page-wrapper dark:bg-[url('/assets/inspiration-desing/blurry-gradient-haikei(2).svg')] bg-[url('/assets/inspiration-desing/blurry-gradient-haikei(3).svg')] bg-cover">
      <div>
        <NavBar />
      </div>
      <main>
        <p>Aqui va el contenido de my flats</p>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MyFlats;
