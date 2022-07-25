import React, { FC, useEffect, useState } from "react";
import "./index.scss";
import ReactModal from "react-modal";
import CanvasDraw from "react-canvas-draw";
import AnatomyImage from "../../assets/images/anatomy.png";
import Textbox from "../Textbox";
import Paginator from "../Paginator";

// * This will need to be changed eventually
export interface IWoundDataMeasurements {
  length: number;
  width: number;
  depth: number;
}

export interface IWoundData {
  type: string;
  location: string;
  measurements: IWoundDataMeasurements;
}

const WoundCard: FC<IWoundData> = ({ type, measurements, location }) => {
  let drawRef: CanvasDraw | null;

  useEffect(() => {
    drawRef?.loadSaveData(location);
  }, []);

  return (
    <div className="wound-manager__wound">
      <CanvasDraw
        brushRadius={7}
        brushColor="red"
        imgSrc={AnatomyImage}
        disabled
        className="wound-manager__wound__canvas"
        ref={(e) => (drawRef = e)}
      />
      <div className="wound-manager__wound__inputs">
        <Textbox
          className="wound-manager__wound__input"
          placeholder="Type of wound"
          value={type}
        />
        <Textbox
          className="wound-manager__wound__input"
          placeholder="Length"
          value={String(measurements.length)}
        />
        <Textbox
          className="wound-manager__wound__input"
          placeholder="Width"
          value={String(measurements.width)}
        />
        <Textbox
          className="wound-manager__wound__input"
          placeholder="Depth"
          value={String(measurements.depth)}
        />
      </div>
    </div>
  );
};

export interface WoundManagerProps {
  isOpen: boolean;
}
const WoundManager: FC<WoundManagerProps> = ({ isOpen }) => {
  const [currentWound, setCurrentWound] = useState<number>(0);
  const [wounds, setWounds] = useState<IWoundData[]>([
    {
      type: "Bed Sore",
      measurements: {
        width: 5,
        length: 3,
        depth: 1.5,
      },
      location:
        '{"lines":[{"points":[{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.49571741369453,"y":117.98984960774926},{"x":56.48942552941668,"y":118.06731839432508},{"x":57.48406199759006,"y":118.13887814779699},{"x":58.47949014437882,"y":118.20497273993047},{"x":59.475593334526344,"y":118.26601416731937},{"x":60.455645227566556,"y":118.24592500899733},{"x":61.455272443527626,"y":118.22701108596122},{"x":61.51539096062795,"y":118.22086281179246},{"x":62.50619876290407,"y":118.12736572831929},{"x":63.49836123109635,"y":118.04097225213188},{"x":64.59933341151695,"y":117.86751840066133},{"x":65.57780836868461,"y":117.72535645766435},{"x":65.75718045949797,"y":117.68419099646445},{"x":66.71264972801247,"y":117.48218459987352},{"x":66.94848901923869,"y":117.41223547695236},{"x":67.87640112539043,"y":117.15902901712612},{"x":69.05993157542852,"y":116.76764430251866},{"x":69.05993157542852,"y":116.76764430251866}],"brushColor":"red","brushRadius":6}],"width":360,"height":400}',
    },
    {
      type: "Something else",
      measurements: {
        width: 5,
        length: 3,
        depth: 1.5,
      },
      location:
        '{"lines":[{"points":[{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.49571741369453,"y":117.98984960774926},{"x":56.48942552941668,"y":118.06731839432508},{"x":57.48406199759006,"y":118.13887814779699},{"x":58.47949014437882,"y":118.20497273993047},{"x":59.475593334526344,"y":118.26601416731937},{"x":60.455645227566556,"y":118.24592500899733},{"x":61.455272443527626,"y":118.22701108596122},{"x":61.51539096062795,"y":118.22086281179246},{"x":62.50619876290407,"y":118.12736572831929},{"x":63.49836123109635,"y":118.04097225213188},{"x":64.59933341151695,"y":117.86751840066133},{"x":65.57780836868461,"y":117.72535645766435},{"x":65.75718045949797,"y":117.68419099646445},{"x":66.71264972801247,"y":117.48218459987352},{"x":66.94848901923869,"y":117.41223547695236},{"x":67.87640112539043,"y":117.15902901712612},{"x":69.05993157542852,"y":116.76764430251866},{"x":69.05993157542852,"y":116.76764430251866}],"brushColor":"red","brushRadius":6}],"width":360,"height":400}',
    },
    {
      type: "test",
      measurements: {
        width: 5,
        length: 3,
        depth: 1.5,
      },
      location:
        '{"lines":[{"points":[{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.08675567827037,"y":117.95530091026006},{"x":55.49571741369453,"y":117.98984960774926},{"x":56.48942552941668,"y":118.06731839432508},{"x":57.48406199759006,"y":118.13887814779699},{"x":58.47949014437882,"y":118.20497273993047},{"x":59.475593334526344,"y":118.26601416731937},{"x":60.455645227566556,"y":118.24592500899733},{"x":61.455272443527626,"y":118.22701108596122},{"x":61.51539096062795,"y":118.22086281179246},{"x":62.50619876290407,"y":118.12736572831929},{"x":63.49836123109635,"y":118.04097225213188},{"x":64.59933341151695,"y":117.86751840066133},{"x":65.57780836868461,"y":117.72535645766435},{"x":65.75718045949797,"y":117.68419099646445},{"x":66.71264972801247,"y":117.48218459987352},{"x":66.94848901923869,"y":117.41223547695236},{"x":67.87640112539043,"y":117.15902901712612},{"x":69.05993157542852,"y":116.76764430251866},{"x":69.05993157542852,"y":116.76764430251866}],"brushColor":"red","brushRadius":6}],"width":360,"height":400}',
    },
  ]);

  return (
    <ReactModal
      isOpen={isOpen}
      className="wound-manager"
      overlayClassName="modal-overlay"
    >
      <h1 className="wound-manager__title">Wound Management</h1>
      <WoundCard
        key={wounds[currentWound].type}
        location={wounds[currentWound].location}
        type={wounds[currentWound].type}
        measurements={wounds[currentWound].measurements}
      />
      <Paginator
        currentPage={currentWound + 1}
        totalPages={wounds.length}
        onForward={() => setCurrentWound(currentWound + 1)}
        onBack={() => setCurrentWound(currentWound - 1)}
      />
    </ReactModal>
  );
};

export default WoundManager;
