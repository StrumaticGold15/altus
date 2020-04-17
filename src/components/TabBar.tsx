import React, { ReactElement, useEffect, useContext } from "react";
import Tab from "./Tab";
import Dragula from "react-dragula";
import { TabContext } from "../context/TabContext";
import Icon from "@iconify/react";
import roundPlus from "@iconify/icons-ic/round-plus";

const TabBar = (): ReactElement => {
  const context = useContext(TabContext);
  const { tabs } = context;

  useEffect(() => {
    // Instantiate Dragula to enable dragging
    Dragula([document.querySelector(".tabs-container")], {
      direction: "horizontal",
      invalid: (el, h) => {
        return el.classList.contains("new-tab");
      },
      accepts: (el, target, src, sibling) => {
        if (sibling === null) {
          return false;
        } else {
          return true;
        }
      },
    });
  }, []);

  return (
    <div className="tabs-container">
      {...tabs &&
        tabs.map((tab: TabObject) => (
          <Tab
            name={tab.name}
            key={tab.id}
            id={tab.id}
            theme={tab.theme}
            notifications={tab.notifications}
            sound={tab.sound}
            {...(tab.icon && { icon: tab.icon })}
          />
        ))}
      <div
        className="tab new-tab"
        onClick={(): void => context.dispatch({ type: "OPEN_TAB_MODAL" })}
      >
        <Icon icon={roundPlus} width="1.5em" />
      </div>
    </div>
  );
};

export default TabBar;