import Simulation from "./notebook/notebookPopout/simulation/Simulation";
import Notebook from "./notebook/Notebook";
import NotebookPopout from "./notebook/notebookPopout/NotebookPopout";
import React, { useState } from "react";
import { sections } from "./notebook/Notebook";
import NotebookIcon from "./notebook/img/notebook-icon.svg";

// import NotebookIcon from "./notebook/img/notebook-icon"
function Scene({ componentToRender }) {
  const [section, setSection] = useState("Introduction");
  const [stateOpenClose, setStateOpenClose] = useState("open");
  return (
    <div>
      {/* <div className="content"> */}
        <NotebookPopout
          index={sections.indexOf(section) + 1}
          sectionSelected={section}
          onSelect={section}
          setState={setSection}
        />
      {/* </div> */}
      {/* <Simulation/> */}
      {/* <NotebookPopout section={"Resources"} index={0}/> */}
      <div className="nav">
       {stateOpenClose === "open" ?  <Notebook
          state={section}
          setState={setSection}
          sectionSelected={section}
          taskPages={sections}
          setStateOpenClose={setStateOpenClose}
          // sliderOpen={false}
          
        /> : <img className="iconOpen" onClick={() => setStateOpenClose("open")} alt="" src={NotebookIcon}/>}
      </div>
      {/* {NotebookIcon} */}
      
    </div>
  );
}

export default Scene;
