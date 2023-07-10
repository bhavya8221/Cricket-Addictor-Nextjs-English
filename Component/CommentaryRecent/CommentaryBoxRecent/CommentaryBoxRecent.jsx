import React from "react";
// import { useState } from "react";
// import "./CommentaryBoxRecent.scss";
const CommentaryBoxRecent = (props) => {
  const { data } = props;
  return (
    <>
     <div className="commentaryBox_recent_section mb-5">
        {/* {Object.keys(data)?.map((item, index) => {
          return (
            <div style={{ display: "flex", flexDirection: "row" }} key={index}>
              {data[item].map((item, index) => {
                return (
                  <div key={index}>
                    {condition === "" ? setCondition(item.event) : null}
                  </div>
                );
              })}
            </div>
          );
        })} */}

        <div className="row commentarymain_section">
          
          <div
            className={
              // condition === "overend"
              //   ? "heading_section condition"
              //   : 
                "heading_section"
            }
          >
             
            <div className="leftHeadingside_section">
              {Object.keys(data)?.map((item, index) => {
                return (
                  <p key={index} className="over_heading">
                   {parseInt(item) + 1}
                  </p>
                );
              })}
              <p className="over_heading">OVER</p>
            </div>

            <div className="rightHeadingside_section">
              <div className="class_section">
                {Object.keys(data)?.map((item, index) => {
                  return (
                    <div
                      style={{ display: "flex", flexDirection: "row" }}
                      key={index}
                    >
                      {data[item].map((item, index) => {
                        return (
                          <div key={index}>
                            {/* {item.event === "overend" ? null : ( */}
                              <div
                                className="class_box"
                                style={{
                                  color:
                                    item.event === "wicket"
                                      ? "#F61D12"
                                      : "black",
                                }}
                              >
                                {item.event === "wicket" ? "w" : item.run}
                              </div>
                            {/* )} */}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
            
          </div>
          
          {Object.keys(data)?.map((item, index) => {
            return (<>
              <div class="verticalLine"></div>
              <div key={index}>
                {data[item]
                  .slice(0)
                  .reverse()
                  .map((item, index) => {
                    return (
                      <div key={index}>
                        {/* {item.event === "overend" ? null : ( */}
                          <>
                            
                           
                            <div className="first_section">
                              <div className="leftside_section">
                                <div className="green_box">
                                  <p className="over_point">
                                    {item.over}
                                    {item.ball !== undefined
                                      ? `.${item.ball}`
                                      : null}
                                  </p>
                                </div>
                                <div
                                  className="orange_box"
                                  style={{
                                    backgroundColor:
                                      item.run === 4
                                        ? "#6C6C6C"
                                        : item.run === 6
                                        ? "#16D9F9"
                                        : item.event === "wicket"
                                        ? "#F61D12"
                                        : "#ffffff",
                                  }}
                                >
                                  <p
                                    className="wicket_point"
                                    style={{
                                      color:
                                        item.run === 4 ||
                                        item.run === 6 ||
                                        item.event === "wicket"
                                          ? "#ffffff"
                                          : "#000000",
                                    }}
                                  >
                                    {item.score}
                                  </p>
                                </div>
                              </div>
                              <div className="rightside_section">
                                <p
                                  className="description_section"
                                  style={{
                                    color:
                                      item.event === "wicket"
                                        ? "#F61D12"
                                        : "#000000",
                                  }}
                                >
                                  {item.commentary}
                                </p>
                              </div>
                            </div>
                            <div class="verticalLine"></div>
                          </>
                        {/* )} */}
                      </div>
                    );
                  })}
              </div>
              </>
            );
          })}
        </div>
      </div>
























    
    </>
  );
};
export default CommentaryBoxRecent;
