import Footer from "../../components/footer/footer";
import "../pages.css";
import { NavBar } from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import { FlatService } from "../../services/flatService";
import FlatCard from "../../components/flat-card/flatCard";
import { useParams } from "react-router-dom";

const ViewFlat = () => {
  const [flat, setFlat] = useState(null);
  const [userLogged, setUserLogged] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });
  const { flatId } = useParams();

  useEffect(() => {
    loadFlat();
  }, []);

  const loadFlat = async () => {
    const flatService = new FlatService();
    const data = await flatService.getFlatById(flatId);
    data.isFavorite = userLogged.favoriteFlatIds?.includes(data._id) || false;
    setFlat(data);
  };

  return (
    <div className="page-wrapper dark:bg-bgdark bg-bglight">
      <div>
        <NavBar />
      </div>
      <main>
        {flat && (
          <div className="flex justify-center items-center h-screen">
            <FlatCard flat={flat} />
          </div>
        )}
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ViewFlat;
