import {
  Card,
  CardFooter,
  Image,
  Button,
  Chip,
  Divider,
  Tooltip,
} from "@heroui/react";
import { MapPinIcon } from "../icons/mapPinIcon";
import { EyeIcon } from "../icons/eyeIcon";
import FavoriteButton from "../favorite-button/FavoriteButton";
import { useNavigate } from "react-router-dom";
import { formatDateToISOShort } from "../../utils/utils";

const FlatCard = ({ flat, handleFavorite }) => {
  const navigate = useNavigate();

  return (
    <Card isFooterBlurred className="border-none" radius="lg">
      <Image
        alt="flat image"
        className="object-cover"
        height={300}
        src="/assets/flat2.jpg"
        width="100%"
      />
      <CardFooter className="bg-background/30 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div className="w-full">
          <div className="justify-between flex items-center">
            <div className="flex items-center gap-2">
              <div>
                <MapPinIcon className="text-primary" />
              </div>
              <div>
                <div>
                  <p className="text-base font-semibold">{flat.city}</p>
                </div>
                <div>
                  <p className="text-sm">{`${flat.streetName}, ${flat.streetNumber}`}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-2xl font-semibold">{`$ ${flat.rentPrice}`}</p>
            </div>
          </div>
          <div className=" my-1 flex justify-center h-8 items-center space-x-4 text-small">
            <div>
              <p className="text-small">{`${flat.areaSize} m²`}</p>
            </div>
            <Divider orientation="vertical" />
            {flat.hasAC ? (
              <div>
                <Chip size="sm" color="success">
                  AC
                </Chip>
              </div>
            ) : (
              <div>
                <Chip size="sm" color="danger">
                  No AC
                </Chip>
              </div>
            )}
            <Divider orientation="vertical" />
            <div>
              <div>
                <p className="text-xs">Date Available</p>
              </div>
              <div>
                <p className="text-txtlight dark:text-txtdark text-small">
                  {new Date(flat.dateAvailable).getTime() < Date.now()
                    ? "Available Now"
                    : formatDateToISOShort(flat.dateAvailable)}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-end items-center gap-1">
              <div>
                <FavoriteButton
                  isFavorite={flat.isFavorite}
                  onClick={() => handleFavorite(flat._id)}
                />
              </div>
              <div>
                <Tooltip
                  content="Details"
                  className="hover:cursor-pointer"
                  placement="top"
                  color="secondary"
                  delay={1000}
                  showArrow
                >
                  <Button
                    className="min-w-10 w-10 p-0 rounded-full bg-transparent"
                    onPress={() => navigate(`/view-flat/${flat._id}`)}
                  >
                    <EyeIcon className="text-txtlight dark:text-txtdark" />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FlatCard;
