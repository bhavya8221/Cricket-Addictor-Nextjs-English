import React, { useState, useEffect } from "react";
import classname from 'classnames';
import { useRouter } from "next/router";
import styles from "./MenuButton.module.scss";

function MenuButton(props) {
  const [activePath, setActivePath] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (props.pathname) {
      let newState = props.menuitems.map((item, index) =>
        props.pathname === item.path ? index : null
      );
      const getIndex = newState.filter((element) => element !== null);
      setActivePath(getIndex[0]);
    }
    // if (props.pathname.split("/")[4] === undefined) {
    //   setActivePath(0);
    // }
    if (props.pathname.split("/")[4] === "teams") {
      setActivePath(3);
    }
    if (props.pathname.split("/")[4] === "matches") {
      setActivePath(1);
    }
    if (props.pathname.split("/")[4] === "point-table") {
      setActivePath(2);
    }
    if (props.pathname.split("/")[4] === "news") {
      setActivePath(4);
    }
    if (props.pathname.split("/")[4] === "videos") {
      setActivePath(5);
    }
    if (props.pathname.split("/")[4] === "stats") {
      setActivePath(6);
    }
    if (props.pathname.split("/")[2] === "men") {
      setActivePath(0);
    }
    if (props.pathname.split("/")[2] === "women") {
      setActivePath(1);
    }
    if (props.pathname.split("/")[4] ==="" ) {
      setActivePath(0);
    }
    if (props.activeMenu !== undefined) {
      setActivePath(props.activeMenu);
    }
  }, [props.activeMenu, props.menuitems, props.pathname]);

  function handleOnClickMenu(path) {
    router.push(path);
  }

  return (
    <div className={styles.menuButton_section}>
      <div className={classname("row", styles.menu_row)}>
        {props.titleVisible === false ? null : (
          <div
            className={styles.MenusSectionTitle}
            style={{ textAlign: props.title === "News" ? null : "center" }}
          >
            <h2 className={props.fontSize === 1 ? styles.fontSize : ""} style={{textTransform:"capitalize"}}>
              {props.title}
            </h2>
          </div>
        )}
        <div
          className={styles.MenusSectionItems}
          style={{
            width: props.titleVisible === false ? "100%" : "fit-content",
          }}
        >
          {props.menuitems.map((items, index) => (
            <h5
              className={classname("mx-2 px-3 py-2", styles.menuItem)}
              key={index}
              style={{
                backgroundColor: activePath === index ? "var(--primary)" : null,
                color: activePath === index ? "#ffffff" : null,
              }}
              onClick={() => handleOnClickMenu(items.path)}
            >
              {items.title}
            </h5>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuButton;
