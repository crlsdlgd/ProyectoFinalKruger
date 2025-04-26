import React, { useState } from "react";
import heartOutlined from "/assets/heartOutlined.png";
import heartSolid from "/assets/heartSolid.png";
import heartOutlinedToSolid from "/assets/heartOutlinedToSolid.gif";
import heartSolidToOutlined from "/assets/heartSolidToOutlined.gif";
import { Button } from "@heroui/react";

const FavoriteButton = () => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [icon, setIcon] = useState(heartOutlined);

  const handleClick = () => {
    if (animating) return; // Evita doble click durante la animación

    setAnimating(true);

    const gif = isFavorited ? heartSolidToOutlined : heartOutlinedToSolid;
    const finalIcon = isFavorited ? heartOutlined : heartSolid;

    setIcon(gif);

    // Espera la duración del gif (~700ms por ejemplo) y luego cambia al ícono final
    setTimeout(() => {
      setIcon(finalIcon);
      setIsFavorited(!isFavorited);
      setAnimating(false);
    }, 300); // Ajusta el tiempo al largo real del gif
  };

  return (
    <Button
      type="button"
      className="m-0 p-0 rounded-full w-10 min-w-5"
      onPress={handleClick}
      disabled={animating}
      style={{ border: "none", background: "none" }}
      cursor="pointer"
    >
      <img src={icon} alt="heart icon" width={25} height={25} />
    </Button>
  );
};

export default FavoriteButton;
