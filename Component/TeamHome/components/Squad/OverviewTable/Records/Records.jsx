import React, { useCallback, useState, useEffect } from "react";
import styles from "./Records.module.scss";
import { teamPlayerProfile } from "../../../../../../Constants/Api/Api";
import { useRouter } from "next/router";

//  
const Records = () => {
  
  const router = useRouter();
  // const { pid ,tid} = useParams();
  const [playerRecord, setPlayerRecord] = useState({});
  const pathname = router.asPath;
  const {slug}=router.query


  // const pathSegments = window.location.pathname.split("/");
  // const index = pathSegments.indexOf(tid);
  // if (index !== -1) {
  //   pathSegments.splice(index, 1);
  // }
  // const newPath = pathSegments.join("/");
 
  // const newUrl = window.location.origin + newPath + window.location.search;
  // window.history.replaceState({}, "", newUrl);
  // const navigate = useNavigate();
  // const Navigation = useCallback(
  //   (value1, value2) => {

  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  useEffect(() => {
    teamPlayerProfile(slug[1])
      .then((res) => {
        
        setPlayerRecord(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [slug[1]]);

  return (
    <>
      <div className={`col ${styles.mainRecord_section}`}>
        <div className={`col ${styles.Tname}`}>
          {playerRecord === "" ? (
            <h5>No Records...</h5>
          ) : (
            <>
              <h5>
                {playerRecord.title === null || playerRecord.title === ""
                  ? "---"
                  : playerRecord.title}{" "}
                records
              </h5>
              <div className={styles.rightcell}>
                <div className={styles.records_section}>
                  <div className={styles.pointDescription_section}>
                    <div className={styles.record_description}>
                      {playerRecord.records === null ||
                      playerRecord.records === ""
                        ? "---"
                        : playerRecord.records}
                    </div>
                  </div>
                </div>
                {/* <Outlet /> */}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Records;
