import Footer from "../../components/footer/footer";
import "../pages.css";
import { NavBar } from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FlatService } from "../../services/flatService";
import FlatForm from "../../components/flat-form/flatForm";
import { addToast } from "@heroui/react";

const EditFlat = () => {
  const [flat, setFlat] = useState({});
  const { flatId } = useParams();

  useEffect(() => {
    loadFlat();
  }, [flatId]);

  const loadFlat = async () => {
    const flatService = new FlatService();
    const data = await flatService.getFlatById(flatId);
    setFlat(data);
  };

  const updateFlat = async () => {
    const flatService = new FlatService();
    try {
      const data = await flatService.updateFlat(flatId, flat);
      addToast({
        title: "Flat updated",
        description: "Flat updated successfully",
        type: "success",
        variant: "bordered",
        color: "success",
      });
      setTimeout(() => {
        window.history.back();
      }, 2000);
    } catch (error) {
      addToast({
        title: "Update failed",
        description: "Error updating flat",
        type: "error",
        variant: "bordered",
        color: "danger",
      });
    }
  };

  return (
    <div className="page-wrapper dark:bg-bgdark bg-bglight">
      <div>
        <NavBar />
      </div>
      <main>
        <div className="flex flex-col items-center justify-center">
          <FlatForm
            flat={flat}
            setFlat={setFlat}
            action={updateFlat}
            buttonText="Update"
          />
        </div>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default EditFlat;
