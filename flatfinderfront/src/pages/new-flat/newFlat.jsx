import Footer from "../../components/footer/footer";
import "../pages.css";
import { NavBar } from "../../components/navbar/navbar";
import { useState } from "react";
import { FlatService } from "../../services/FlatService";
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
    <div className="page-wrapper dark:bg-[url('/assets/inspiration-desing/blurry-gradient-haikei(2).svg')] bg-[url('/assets/inspiration-desing/blurry-gradient-haikei(3).svg')] bg-cover">
      <div>
        <NavBar />
      </div>
      <main className="newflat-container ">
        <div className="newflat-form-container bg-background/30 before:bg-white/10">
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
