import Simulation from "./notebook/notebookPopout/simulation/Simulation";
import Notebook from "./notebook/Notebook";
import NotebookPopout from "./notebook/notebookPopout/NotebookPopout";
import React, {useState} from "react";
import { sections } from "./notebook/Notebook";
function Scene({componentToRender}) {
  const [section, setSection] = useState("Introduction");
  return <div>
    <NotebookPopout index={sections.indexOf(section)+1} sectionSelected={section} onSelect={section} />
    {/* <Simulation/> */}
    {/* <NotebookPopout section={"Resources"} index={0}/> */}
    <Notebook state={section} setState={setSection}/>
  </div>;
}

export default Scene;
