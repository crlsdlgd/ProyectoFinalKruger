import { Card, CardFooter, Image, Button, Chip, Divider } from "@heroui/react";
import { MapPinIcon } from "../icons/mapPinIcon";
import { HeartOutlineIcon } from "../icons/heartOutlineIcon";
import { EyeIcon } from "../icons/eyeIcon";
import { useEffect } from "react";

const FlatCard = ({ flat }) => {
  useEffect(() => {
    console.log("FlatCard props:", flat);
  }, [flat]);
  return (
    <Card isFooterBlurred className="border-none" radius="lg">
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={300}
        src="/assets/flat2.jpg"
        width={300}
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
              <p className="text-base font-semibold">{`$ ${flat.rentPrice}`}</p>
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
                <p className="text-small">{flat.dateAvailable.slice(0, 10)}</p>
              </div>
              <div>
                <p className="text-xs">Date Available</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-end items-center gap-1">
              <div>
                {flat.isFavorite ? (
                  <Button
                    className="text-tiny bg-black/20 w-10 min-w-10 p-0"
                    radius="lg"
                    size="sm"
                    variant="flat"
                    color="default"
                  >
                    <HeartOutlineIcon className="text-red-500 fill-red-500" />
                  </Button>
                ) : (
                  <Button
                    className="text-tiny bg-black/20 w-10 min-w-10 p-0"
                    radius="lg"
                    size="sm"
                    variant="flat"
                    color="default"
                  >
                    <HeartOutlineIcon className="text-txtlight dark:text-txtdark" />
                  </Button>
                )}
              </div>
              <div>
                <Button
                  className="text-tiny bg-black/20 w-10 min-w-10 p-0"
                  radius="lg"
                  size="sm"
                  variant="flat"
                  color="default"
                >
                  <EyeIcon className="text-txtlight dark:text-txtdark" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FlatCard;
