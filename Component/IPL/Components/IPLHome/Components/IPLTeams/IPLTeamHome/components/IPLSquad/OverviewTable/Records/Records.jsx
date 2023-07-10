import React, { useCallback, useState, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import "./Records.scss";
import { TeamPlayerProfile } from "../../../../../../Constants/Api/Api";
 
const Records = () => {
  const { pid } = useParams();
  const [playerRecord, setPlayerRecord] = useState({});

   // const navigate = useNavigate();
  // const Navigation = useCallback(
  //   (value1, value2) => {
       
  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );


  useEffect(() => {
    TeamPlayerProfile(pid)
      .then((res) => {
        setPlayerRecord(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
        
      });
  }, [pid]);

  return (
    <>
      <div className="col mainRecord_section">
        <div className="col Tname">
          {playerRecord === "" ? (
            <h5>No Records...</h5>
          ) : (
            <>
              <h5>
                {playerRecord.title === null || playerRecord.title === ""
                  ? "---"
                  : playerRecord.title}{" "}
                Records
              </h5>
              <div className="rightcell">
                <div className="records_section">
                  <div className="pointDescription_section">
                    <div className="record_description">
                      {playerRecord.records === null ||
                      playerRecord.records === ""
                        ? "---"
                        : playerRecord.records}
                    </div>
                  </div>
                </div>
                <Outlet />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Records;
