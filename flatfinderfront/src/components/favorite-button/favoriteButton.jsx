import { useEffect, useState } from "react";
import heartOutlined from "/assets/heartOutlined.png";
import heartSolid from "/assets/heartSolid.png";
import heartOutlinedToSolid from "/assets/heartOutlinedToSolid.gif";
import heartSolidToOutlined from "/assets/heartSolidToOutlined.gif";
import { Button, Tooltip } from "@heroui/react";

const FavoriteButton = ({ isFavorite, onClick }) => {
  const [isFavorited, setisFavorited] = useState(isFavorite);
  const [animating, setAnimating] = useState(false);
  const [icon, setIcon] = useState(heartOutlined);
  const tooltipText = isFavorited
    ? "Remove from favorites"
    : "Add to favorites";

  useEffect(() => {
    setisFavorited(isFavorite);
    setIcon(isFavorite ? heartSolid : heartOutlined);
  }, [isFavorite]);

  const handleClick = () => {
    if (animating) return; // Evita doble click durante la animación

    setAnimating(true);

    const gif = isFavorited ? heartSolidToOutlined : heartOutlinedToSolid;
    const finalIcon = isFavorited ? heartOutlined : heartSolid;

    setIcon(gif);

    // Espera la duración del gif (~700ms por ejemplo) y luego cambia al ícono final
    setTimeout(() => {
      setIcon(finalIcon);
      // setisFavorite(!isFavorite);
      onClick(!isFavorited);
      setAnimating(false);
    }, 300); // Ajusta el tiempo al largo real del gif
  };

  return (
    <Tooltip
      content={tooltipText}
      className="hover:cursor-pointer"
      placement="left"
      color="secondary"
      delay={1000}
      showArrow
    >
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
    </Tooltip>
  );
};

export default FavoriteButton;
