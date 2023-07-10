import React from "react";
import "./Table.scss";
import SideTable from "./SideTable/SideTable";
import { Row } from "react-bootstrap";
import Banner from "../../Banner/Banner";
const Table = () => {
  // const pathSegments = window.location.pathname.split("/");
  // const index = pathSegments.indexOf(cid);
  // if (index !== -1) {
  //   pathSegments.splice(index, 1);
  // }
  // const newPath = pathSegments.join("/");

  // const newUrl = window.location.origin + newPath + window.location.search;
  // window.history.replaceState({}, "", newUrl);
  // React.useEffect(() => {
  //   window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  // }, []);
  return (
    <>
      <div className="tableSection">
        <Row>
        <Banner/>
          <Row>
            <SideTable />
          </Row>

          
        </Row>
      </div>
    </>
  );
};

export default Table;
