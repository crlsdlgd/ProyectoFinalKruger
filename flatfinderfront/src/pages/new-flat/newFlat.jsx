import Footer from "../../components/footer/footer";
import "../pages.css";
import { NavBar } from "../../components/navbar/navbar";
import { useState } from "react";
import { FlatService } from "../../services/flatService";
import FlatForm from "../../components/flat-form/flatForm";
import { addToast } from "@heroui/react";
import "./newFlat.css";

const NewFlat = () => {
  const [flat, setFlat] = useState({});

  const createFlat = async () => {
    const flatService = new FlatService();
    try {
      const data = await flatService.createFlat(flat);
      addToast({
        title: "Flat created",
        description: "Flat created successfully",
        type: "success",
        variant: "bordered",
        color: "success",
      });
      setTimeout(() => {
        window.history.back();
      }, 2000);
    } catch (error) {
      addToast({
        title: "Error",
        description: "Error creating flat",
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
      <main className="newflat-container">
        <div className="newflat-form-container dark:bg-bgdarkOpacity bg-bglightOpacity">
          <FlatForm
            flat={flat}
            setFlat={setFlat}
            action={createFlat}
            buttonText="Add Flat"
          />
        </div>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default NewFlat;
