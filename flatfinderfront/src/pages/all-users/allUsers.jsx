import Footer from "../../components/footer/footer";
import "../pages.css";
import { NavBar } from "../../components/navbar/navbar";

const AllUsers = () => {
  return (
    <div className="page-wrapper dark:bg-bgdark bg-bglight">
      <div>
        <NavBar />
      </div>
      <main>
        <p>Aqui va el contenido de all users</p>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AllUsers;
