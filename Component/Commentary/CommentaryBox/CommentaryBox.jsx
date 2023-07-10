import React from "react";
import { useState } from "react";
import styles from "./CommentaryBox.module.scss";
const CommentaryBox = (props) => {
  const { data } = props;
  const [condition, setCondition] = useState("");
  return (
    <>
      <div className={`${styles.commentaryBox_section} mb-5`}>
        {Object.keys(data)?.map((item, index) => {
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
        })}

        <div className={`row ${styles.commentarymain_section}`}>
          <div
            className={
              condition === "overend"
                ? `${styles.heading_section} ${styles.condition}`
                : styles.heading_section
            }
          >
            <div className={styles.leftHeadingside_section}>
              {Object.keys(data)?.map((item, index) => {
                return (
                  <p key={index} className={styles.over_heading}>
                    {parseInt(item) + 1}
                    {/* or */}
                    {/* {+item + 1} */}
                  </p>
                );
              })}
              <p className={styles.over_heading}>OVER</p>
            </div>

            <div className={styles.rightHeadingside_section}>
              <div className={styles.class_section}>
                {Object.keys(data)?.map((item, index) => {
                  // {data==="tab"||data==="data"}
                  return (
                    <div
                      style={{ display: "flex", flexDirection: "row" }}
                      key={index}
                    >
                      {data[item].map((item, index) => {
                        return (
                          <div key={index}>
                            {item.event === "overend" ? null : (
                              <div
                                className={styles.class_box}
                                style={{
                                  color:
                                    item.event === "wicket"
                                      ? "#F61D12"
                                      : "black",
                                }}
                              >
                                {item.event === "wicket" ? "w" : item.run}
                              </div>
                            )}
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
            return (
              <>
                <div class={styles.verticalLine}></div>
                <div key={index}>
                  {data[item]
                    .slice(0)
                    .reverse()
                    .map((item, index) => {
                      return (
                        <div key={index}>
                          {item.event === "overend" ? null : (
                            <>
                              <div className={styles.first_section}>
                                <div className={styles.leftside_section}>
                                  <div className={styles.green_box}>
                                    <p className={styles.over_point}>
                                      {item.over}
                                      {item.ball !== undefined
                                        ? `.${item.ball}`
                                        : null}
                                    </p>
                                  </div>
                                  <div
                                    className={styles.orange_box}
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
                                      className={styles.wicket_point}
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
                                <div className={styles.rightside_section}>
                                  <p
                                    className={styles.description_section}
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
                              <div className={styles.verticalLine}></div>
                            </>
                          )}
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
export default CommentaryBox;
