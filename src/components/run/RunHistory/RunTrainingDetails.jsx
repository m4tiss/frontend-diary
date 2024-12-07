import { motion } from "framer-motion";
import ReactStars from "react-stars";
import icon from "../../../icons/transparent.png";
import { createPortal } from "react-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import {
  formattedData,
  formattedDate,
  formattedTime,
  formattedDuration,
} from "../../../functions/formatData";
import { useTranslation } from "react-i18next";
import { useContext, useEffect} from "react";
import DarkModeContext from "../../../providers/DarkModeProvider";
import { CiStar } from "react-icons/ci";
import { MdOutlineNoteAlt, MdOutlineTimer } from "react-icons/md";
import { CiCalendarDate, CiWavePulse1 } from "react-icons/ci";
import { GiPathDistance } from "react-icons/gi";
import { TfiMapAlt } from "react-icons/tfi";
import { LuMapPinOff } from "react-icons/lu";

const customIcon = new Icon({
  iconUrl: icon,
  iconSize: [0, 0],
});

const MapInteractions = ({ coordinates }) => {
  const map = useMap();

  useEffect(() => {
    if (coordinates.length > 0) {
      const firstCoordinate = coordinates[0];
      map.setView(firstCoordinate, 13);
    }
  }, [coordinates, map]);

  return null;
};

const RunTrainingDetails = ({ toggleDialog, training, onDelete, hideDelete }) => {
  const { t } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);

  const coordinates = training.coordinates.map((coord) => [
    parseFloat(coord.latitude),
    parseFloat(coord.longitude),
  ]);

  const handleDelete = () => {
    onDelete();
    toggleDialog();
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={toggleDialog}
    >
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.2, opacity: 0 }}
        className={`flex flex-col items-center 
          rounded-xl p-6 shadow-xl w-3/4 h-5/6 gap-10 xl:gap-10 overflow-auto
          ${darkMode ? `bg-run-night-background text-white` : `bg-white text-black`}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex flex-col xl:flex-row items-center px-10 justify-between">
          <h2 className="text-4xl"> {t(`run.categories.${training.category_name}`|| "UNKNOWN TITLE")}</h2>
          <div className="flex gap-5">
          {!hideDelete && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 500 }}
                onClick={handleDelete}
                className="mt-4 px-4 py-2 h-fit shadow-xl bg-red-500 text-white rounded"
              >
                {t("shared.actions.delete")}
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500 }}
              onClick={toggleDialog}
              className="mt-4 px-4 py-2 h-fit shadow-xl bg-purple-500 text-white rounded"
            >
              {t("shared.actions.close")}
            </motion.button>
          </div>
        </div>

        <div className="w-full flex flex-col-reverse xl:flex-row flex-grow gap-10 xl:gap-0">
          <div className="w-full xl:w-3/4 flex flex-col justify-start items-center gap-10 px-5 xl:px-20">
            <div className="flex flex-col gap-3">
              <div className="w-full flex justify-center items-center gap-3">
                <TfiMapAlt size={35} />
                <h2 className="text-3xl font-semibold">Twoja trasa</h2>
              </div>
              {coordinates.length > 0 ? (
                <div className="w-full flex justify-center items-center">
                  <MapContainer
                    center={coordinates[0]}
                    zoom={30}
                    style={
                      window.innerWidth > 768
                        ? { height: "300px", width: "600px" }
                        : { height: "250px", width: "250px" }
                    }
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap contributors"
                    />
                    <Polyline positions={coordinates} color="blue" />
                    {coordinates.map((position, index) => (
                      <Marker key={index} position={position} icon={customIcon} />
                    ))}
                    <MapInteractions coordinates={coordinates} />
                  </MapContainer>
                </div>
              ) : (
                <div className="w-full pt-5 xl:pt-0 xl:h-[300px] flex justify-center items-center">
                  <LuMapPinOff size={100} />
                </div>
              )}
            </div>

            <div className="w-full text-center">
              <div className="w-full flex justify-center items-center gap-3">
                <MdOutlineNoteAlt size={40} />
                <h2 className="text-3xl font-semibold">{t("run.general.note")}</h2>
              </div>
              <label className="w-96 overflow-hidden text-xl">{training.note}</label>
            </div>
          </div>
          <div className="w-full xl:w-1/4 flex flex-col gap-10 justify-center text-center items-center">
            <div>
              <div className="w-full flex justify-center items-end gap-3">
                <GiPathDistance size={35} />
                <h2 className="text-3xl font-semibold">{t("run.general.distance")}</h2>
              </div>
              <label className="text-xl">{formattedData(training.distance || 0)} km</label>
            </div>

            <div>
              <div className="w-full flex justify-center items-end gap-3">
                <MdOutlineTimer size={35} />
                <h2 className="text-3xl font-semibold">{t("run.general.duration")}</h2>
              </div>
              <label className="text-xl">{formattedDuration(training.duration || "00:00:00")}</label>
            </div>

            <div>
              <div className="flex justify-center items-end gap-3">
                <CiCalendarDate size={35} />
                <h2 className="text-3xl font-semibold">{t("gym.general.date")}</h2>
              </div>
              <label className="text-xl">{formattedTime(training.date) || "00:00:00"} {formattedDate(training.date) || "00:00:00"}</label>
            </div>

            <div>
              <div className="w-full flex justify-center items-end gap-3">
                <CiWavePulse1 size={35} />
                <h2 className="text-3xl font-semibold">{t("run.general.averagePulse")}</h2>
              </div>
              <label className="text-xl">{training.average_pulse}</label>
            </div>

            <div>
              <div className="flex justify-center items-end gap-3">
                <CiStar size={35} />
                <h2 className="text-3xl font-semibold">{t("run.general.rating")}</h2>
              </div>
              <div className="flex justify-center items-center gap-3">
                <h2 className="text-xl">{formattedData(training.rating || 0)}</h2>
                <ReactStars
                  count={5}
                  size={30}
                  color1="gray"
                  color2={"#ffd700"}
                  value={training.rating}
                  edit={false}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default RunTrainingDetails;
