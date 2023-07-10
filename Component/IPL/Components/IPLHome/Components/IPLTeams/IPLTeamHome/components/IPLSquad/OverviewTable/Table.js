import React from "react";
import "./Table.scss";
import SideTable from "./SideTable/SideTable";
import { Outlet } from "react-router-dom";
import { Row } from "react-bootstrap";
import Banner from "../../Banner/Banner";
const Table = () => {
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  return (
    <>
      <div className="tableSection">
        <Row>
        <Banner/>
          <Row>
            <SideTable />
          </Row>

          <Outlet />
        </Row>
      </div>
    </>
  );
};

export default Table;
