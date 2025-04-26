import React, { useState, useContext, useEffect } from "react";
import Map from "../../map";
import classes from "./JourneyTabContent.module.css";
import JourneyTabOverlay from "./JourneyTabOverlay";
import collapseArrow from "../../../../public/assets/images/collapse.png";
import Image from "next/image";
import { SocketContext } from "../../../context/socketContext/socketContext";
import JourneyMaps from "../../journeyMaps/JourneyMaps";
import JourneyMapContextProvider, {
  JourneyMapContext,
} from "../../../context/journeyMapContext/JourneyMapContext";
import StatisticsModal from "../../modal/StatisticsModal";
import { RoutesContext, RoutesProvider } from "../../../context/routesContext/RoutesContext";

const JourneyTabContent = React.memo(() => {
  const socketCtx = useContext(SocketContext);
  const journeyMapCtx = useContext(JourneyMapContext);
  const [journeyInformationCollapse, setJourneyInformationCollapse] =
    useState<boolean>(false);
  const [socketDataLoaded, setSocketDataLoaded] = useState(
    socketCtx.socketDataLoaded
  );
  ////console.log('journey tab content')

  useEffect(() => {
    setSocketDataLoaded(socketCtx.socketDataLoaded);

    return () => {
      journeyMapCtx.setHideMap(true);
    };
  }, [socketCtx.socketDataLoaded]);
  return (
    <RoutesProvider>
    <JourneyMapContextProvider>
      <div className={classes.journeyMapParent}>
        <JourneyMaps />
        <div
          className={`${
            !journeyInformationCollapse
              ? classes.journeyMapOverlay
              : classes.journeyMapOverlayCollapse
          } `}
        >
          {<JourneyTabOverlay />}
        </div>

        {
          <div
            className={
              !journeyInformationCollapse
                ? classes.collapseArrow
                : classes.collapseArrowCollapased
            }
            onClick={() =>
              setJourneyInformationCollapse(!journeyInformationCollapse)
            }
          >
            <Image
              src={collapseArrow.src}
              width={"8px"}
              height={"10px"}
              alt="collapseArrow-img"
            />
          </div>
        }
      </div>
      
    </JourneyMapContextProvider>
    </RoutesProvider>
  );
});

export default JourneyTabContent;
