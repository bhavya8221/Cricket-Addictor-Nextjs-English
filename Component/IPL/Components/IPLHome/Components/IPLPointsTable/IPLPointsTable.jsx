import React, { useState, useEffect } from "react";
import "./IPLPointsTable.scss";
import icon1 from "../../../../../../../assets/Images/no-flag.png";
import { competitionStandingAPI } from "../../../../../../Constants/Api/Api";
import { useParams } from "react-router-dom";
// import ClipLoader from "react-spinners/ClipLoader";

const IPLPointsTable = () => {
  const { cid } = useParams();
  const [competitionStanding, setCompetitionStanding] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [gender, setGender] = React.useState("MENS");

  // function handleOnClickMens() {
  //   setGender("MENS");
  // }
  // function handleOnClickWomens() {
  //   setGender("WOMENS");
  // }

  // const navigate = useNavigate();
  // const Navigation = useCallback(
  //   (value1, value2) => {

  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setIsLoading(true);
    competitionStandingAPI(cid)
      .then((res) => {
        setCompetitionStanding(res.data.data);
        setIsLoading(false);
      })
      .catch((e) => {
       
      });
  }, [cid]);

 

  return (
    <div>
      <div className="pointtable-section">
        {/* <div className="player_gender mb-2 mx-4">
          <h5
            className="mens"
            style={{
              backgroundColor: gender === "MENS" ? null : "unset",
              color: gender === "MENS" ? "var(--primary)" : "white",
            }}
            onClick={handleOnClickMens}
          >
            MEN
          </h5>
          <h5
            className="womens"
            style={{
              backgroundColor: gender === "WOMENS" ? null : "unset",
              color: gender === "WOMENS" ? "var(--primary)" : "white",
            }}
            onClick={handleOnClickWomens}
          >
            WOMEN
          </h5>
        </div> */}
        <div className="row-fluid row--center">
          {isLoading === true ? //     loading={isLoading} //     color={"var(--primary)"} //   <ClipLoader // <div className="loader">
          //     size={30}
          //   />
          // </div>
          null : (
            <table className="styled-table">
              <thead>
                <tr>
                  <th></th>
                  <th className="text_left">Team</th>
                  <th>Pld</th>
                  <th>Won</th>
                  <th>Lost</th>
                  <th>Tied</th>
                  <th>N/R</th>
                  <th>Net RR</th>
                  <th>For</th>
                  <th>Against</th>
                  <th>Pls</th>
                  <th>Form</th>
                </tr>
              </thead>
              <tbody>
                {competitionStanding.length !== 0
                  ? competitionStanding
                      .sort(function (a, b) {
                        return b.points - a.points;
                      })
                      .map((item, index) => {
                        return (
                          <tr className="white-row winner" key={index}>
                            {/* <td><img alt="images" src={winnr}></img></td> */}
                            <td>{index + 1}</td>
                            <td className="text_left">
                              <img
                                alt="images"
                                src={
                                  item.team.logo_url === "" ||
                                  item.team.logo_url === null
                                    ? icon1
                                    : item.team.logo_url
                                }
                              />{" "}
                              <b>{item.team.abbr}</b>
                            </td>
                            <td>{item.played}</td>
                            <td>{item.win}</td>
                            <td>{item.loss}</td>
                            <td>{item.draw}</td>
                            <td>{item.nr}</td>
                            <td>{item.netrr}</td>
                            <td>{item.For}</td>
                            <td>{item.Against}</td>
                            <td>{item.points}</td>
                            <td>
                              <span
                                className={
                                  item.lastfivematchresult
                                    .replace(/\s+/g, "")
                                    .charAt(0) === "L"
                                    ? "back-green"
                                    : "back-red"
                                }
                              >
                                {item.lastfivematchresult
                                  .replace(/\s+/g, "")
                                  .charAt(0)}
                              </span>
                              <span
                                className={
                                  item.lastfivematchresult
                                    .replace(/\s+/g, "")
                                    .charAt(2) === "L"
                                    ? "back-green"
                                    : "back-red"
                                }
                              >
                                {item.lastfivematchresult
                                  .replace(/\s+/g, "")
                                  .charAt(2)}
                              </span>
                              <span
                                className={
                                  item.lastfivematchresult
                                    .replace(/\s+/g, "")
                                    .charAt(4) === "L"
                                    ? "back-green"
                                    : "back-red"
                                }
                              >
                                {item.lastfivematchresult
                                  .replace(/\s+/g, "")
                                  .charAt(4)}
                              </span>
                              <span
                                className={
                                  item.lastfivematchresult
                                    .replace(/\s+/g, "")
                                    .charAt(6) === "L"
                                    ? "back-green"
                                    : "back-red"
                                }
                              >
                                {item.lastfivematchresult
                                  .replace(/\s+/g, "")
                                  .charAt(6)}
                              </span>
                              <span
                                className={
                                  item.lastfivematchresult
                                    .replace(/\s+/g, "")
                                    .charAt(8) === "L"
                                    ? "back-green"
                                    : "back-red"
                                }
                              >
                                {item.lastfivematchresult
                                  .replace(/\s+/g, "")
                                  .charAt(8)}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                  : null}
              </tbody>
            </table>
          )}
        </div>

        <div className="ADS px-4 my-3">
          <h2 style={{ color: "white", paddingTop: 18 }}>AD</h2>
        </div>
      </div>
    </div>
  );
};

export default IPLPointsTable;
