import React from "react";
import StatsTable from "../Stats/StatsTable/StatsTable";
import styles from "./Matches.module.scss";
import { useRouter } from "next/router";

const Matches = () => {
  // const { pathname } = useLocation();
  const router =useRouter()
  const{tid}=router.query
  const pathSegments = window.location.pathname.split("/");
  const index = pathSegments.indexOf(tid);
  if (index !== -1) {
    pathSegments.splice(index, 1);
  }
  const newPath = pathSegments.join("/");
  const newUrl = window.location.origin + newPath + window.location.search;
  window.history.replaceState({}, "", newUrl);
  return (
    <>
      <div className={`"col" ${styles.matches_Section}`}>
        <div className={`"col" ${styles.Tname}`}>
          <h5>Matches</h5> 
          <div className={styles.rightcol}>
            <div className="row">
              <div className={styles.matches_main}>
                <div className={styles.oneBox}>
                  <div className={styles.test_heading}>Test Matches</div>
                  <div className={styles.debut_section}>
                    <div className={styles.debutText}>Debut</div>
                    <div className={styles.debutLine}></div>
                    <div className={styles.indiaText}>
                      India vs West Indies at Kolkata - November 06 - 08, 2013
                    </div>
                    <div className={styles.debutLine}></div>
                    <div className={styles.viewButton}>View Match</div>
                  </div>
                </div>
                <div className={styles.oneBox}>
                  <div className={styles.test_heading}>Test Matches</div>
                  <div className={styles.debut_section}>
                    <div className={styles.debutText}>Debut</div>
                    <div className={styles.debutLine}></div>
                    <div className={styles.indiaText}>
                      India vs West Indies at Kolkata - November 06 - 08, 2013
                    </div>
                    <div className={styles.debutLine}></div>
                    <div className={styles.viewButton}>View Match</div>
                  </div>
                </div>
                <div className={styles.oneBox}>
                  <div className={styles.test_heading}>Test Matches</div>
                  <div className={styles.debut_section}>
                    <div className={styles.debutText}>Debut</div>
                    <div className={styles.debutLine}></div>
                    <div className={styles.indiaText}>
                      India vs West Indies at Kolkata - November 06 - 08, 2013
                    </div>
                    <div className={styles.debutLine}></div>
                    <div className={styles.viewButton}>View Match</div>
                  </div>
                </div>
                <div className={styles.oneBox}>
                  <div className={styles.test_heading}>Test Matches</div>
                  <div className={styles.debut_section}>
                    <div className={styles.debutText}>Debut</div>
                    <div className={styles.debutLine}></div>
                    <div className={styles.indiaText}>
                      India vs West Indies at Kolkata - November 06 - 08, 2013
                    </div>
                    <div className={styles.debutLine}></div>
                    <div className={styles.viewButton}>View Match</div>
                  </div>
                </div>
              </div>
            </div>
            {/* <Outlet /> */}
          </div>
          <StatsTable />
        </div>
      </div>
    </>
  );
};
export default Matches;
