import Footer from "../../components/footer/footer";
import "../pages.css";
import { NavBar } from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import { FlatService } from "../../services/flatService";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Divider, Image, Tooltip, user } from "@heroui/react";
import { MapPinIcon } from "../../components/icons/mapPinIcon";
import { MapIcon } from "../../components/icons/mapIcon";
import { HomeModernIcon } from "../../components/icons/homeModernIcon";
import "./viewFlat.css";
import { ClimateIcon } from "../../components/icons/climateIcon";
import { CalendarIcon } from "../../components/icons/calendarIcon";
import { MoneyIcon } from "../../components/icons/moneyIcon";
import { CalendarCheckIcon } from "../../components/icons/CalendarCheckIcon";
import { CloseIcon } from "../../components/icons/closeIcon";
import { PencilSquareIcon } from "../../components/icons/pencilSquareIcon";
import { formatDateToISOShort } from "../../utils/utils";

const ViewFlat = () => {
  const [flat, setFlat] = useState(null);
  const [userLogged, setUserLogged] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });
  const navigate = useNavigate();
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
          <div className="flex flex-col justify-between md:w-4/5 mx-auto relative">
            <div>
              <Image
                alt="flat image"
                className="object-cover"
                src="/assets/flat2.jpg"
                width="100%"
                height="auto"
              />
            </div>
            <div className="absolute top-4 right-4 z-10">
              <Button
                className="min-w-10 w-10 rounded-full p-0"
                onPress={() => window.history.back()}
              >
                <CloseIcon />
              </Button>
            </div>
            <div className="mt-4 flat-info">
              <div className="flex items-center gap-2">
                <Divider className="my-2" orientation="vertical" />
                <MapPinIcon className="text-txtlight dark:text-txtdark" />
                <span className="text-txtlight dark:text-txtdark">{` ${flat.city}`}</span>
              </div>

              <div className="flex items-center gap-2">
                <Divider className="my-2" orientation="vertical" />
                <MapIcon className="text-txtlight dark:text-txtdark" />
                <span className="text-txtlight dark:text-txtdark">{` ${flat.streetName}`}</span>
              </div>

              <div className="flex items-center gap-2">
                <Divider className="my-2" orientation="vertical" />
                <HomeModernIcon className="text-txtlight dark:text-txtdark" />
                <span className="text-txtlight dark:text-txtdark">{` ${flat.streetNumber}`}</span>
              </div>

              <div className="flex items-center gap-2">
                <Divider className="my-2" orientation="vertical" />
                <ClimateIcon className="text-txtlight dark:text-txtdark" />
                <span className="text-txtlight dark:text-txtdark">{` ${flat.hasAC ? "Has AC" : "No AC"}`}</span>
              </div>

              <div className="flex items-center gap-2">
                <Divider className="my-2" orientation="vertical" />
                <CalendarIcon className="text-txtlight dark:text-txtdark" />
                <span className="text-txtlight dark:text-txtdark">{` ${flat.yearBuilt}`}</span>
              </div>

              <div className="flex items-center gap-2">
                <Divider className="my-2" orientation="vertical" />
                <MoneyIcon className="text-txtlight dark:text-txtdark" />
                <span className="text-txtlight dark:text-txtdark">{`$${flat.rentPrice}/month`}</span>
              </div>

              <div className="flex items-center gap-2">
                <Divider className="my-2" orientation="vertical" />
                <CalendarCheckIcon className="text-txtlight dark:text-txtdark" />
                <span className="text-txtlight dark:text-txtdark">
                  {new Date(flat.dateAvailable).getTime() < Date.now()
                    ? "Available Now"
                    : "Available on " +
                      formatDateToISOShort(flat.dateAvailable)}
                </span>
              </div>
            </div>
            <div className="flex justify-end">
              {userLogged._id.toString() == flat.ownerId && (
                <Tooltip
                  content="Edit Flat"
                  className="hover:cursor-pointer"
                  placement="top"
                  color="secondary"
                  delay={1000}
                  showArrow
                >
                  <Button
                    className="p-0 rounded-full w-10 min-w-10 bg-primary hover:bg-primary-hover text-txtdark right-4"
                    onPress={() => navigate(`/edit-flat/${flat._id}`)}
                  >
                    <PencilSquareIcon />
                  </Button>
                </Tooltip>
              )}
            </div>
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
