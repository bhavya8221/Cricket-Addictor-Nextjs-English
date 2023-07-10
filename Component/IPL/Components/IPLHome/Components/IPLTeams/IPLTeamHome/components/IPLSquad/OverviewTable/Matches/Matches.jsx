import React from "react";
import { Outlet } from "react-router-dom";
import StatsTable from "../Stats/StatsTable/StatsTable";
import "./Matches.scss";

const Matches = () => {
  return (
    <>
      <div className="col matches_Section">
        <div className="col Tname">
          <h5>Matches</h5> 
          <div className="rightcol">
            <div className="row">
              <div className="matches_main">
                <div className="oneBox">
                  <div className="test_heading">Test Matches</div>
                  <div className="debut_section">
                    <div className="debutText">Debut</div>
                    <div className="debutLine"></div>
                    <div className="indiaText">
                      India vs West Indies at Kolkata - November 06 - 08, 2013
                    </div>
                    <div className="debutLine"></div>
                    <div className="viewButton">View Match</div>
                  </div>
                </div>
                <div className="oneBox">
                  <div className="test_heading">Test Matches</div>
                  <div className="debut_section">
                    <div className="debutText">Debut</div>
                    <div className="debutLine"></div>
                    <div className="indiaText">
                      India vs West Indies at Kolkata - November 06 - 08, 2013
                    </div>
                    <div className="debutLine"></div>
                    <div className="viewButton">View Match</div>
                  </div>
                </div>
                <div className="oneBox">
                  <div className="test_heading">Test Matches</div>
                  <div className="debut_section">
                    <div className="debutText">Debut</div>
                    <div className="debutLine"></div>
                    <div className="indiaText">
                      India vs West Indies at Kolkata - November 06 - 08, 2013
                    </div>
                    <div className="debutLine"></div>
                    <div className="viewButton">View Match</div>
                  </div>
                </div>
                <div className="oneBox">
                  <div className="test_heading">Test Matches</div>
                  <div className="debut_section">
                    <div className="debutText">Debut</div>
                    <div className="debutLine"></div>
                    <div className="indiaText">
                      India vs West Indies at Kolkata - November 06 - 08, 2013
                    </div>
                    <div className="debutLine"></div>
                    <div className="viewButton">View Match</div>
                  </div>
                </div>
              </div>
            </div>
            <Outlet />
          </div>
          <StatsTable />
        </div>
      </div>
    </>
  );
};
export default Matches;
