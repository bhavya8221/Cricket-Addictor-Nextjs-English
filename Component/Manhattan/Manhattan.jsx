import React, { useCallback, useState, useEffect } from "react";
import styles from "./Manhattan.module.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { manhattanAPI } from "../../Constants/Api/Api";
import { useRouter } from "next/router";

const Manhattan = () => {
  const router = useRouter();
  const { slug } = router.query;
  const match_id = slug[0];
  const latest_inning_number = slug[1];
  // const { match_id, latest_inning_number } = useParams();
  const [dataList, setDataList] = useState([]);
  const [barList, setBarList] = useState([]);
  // const navigate = useNavigate();
  // const Navigation = useCallback(
  //   (value1, value2) => {

  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  useEffect(() => {
    // setIsLoading(true);
    manhattanAPI(match_id, latest_inning_number)
      .then((res) => {
        setDataList(res.data.data.result);
        setBarList(res.data.data.tab);
        // setIsLoading(false);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [latest_inning_number, match_id]);



  return (
    <div className={styles.manhattan}>
      <div className={styles.head}>
        <h3 className={styles.H3}>
          Manhattan
        </h3>
      </div>
      <div className={styles["scroll-bar"]}>
        <ResponsiveContainer
          className={styles["bar-res"]}
          width="100%"
          aspect={3}
        >
          <BarChart
            width={500}
            height={300}
            data={dataList}
            margin={{
              top: 30,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {barList.map((item, index) => {
              return (
                <Bar
                  key={index}
                  dataKey={item.name}
                  fill={
                    index === 0
                      ? "var(--primary)"
                      : index === 1
                      ? "var(--secondary)"
                      : index === 2
                      ? "green"
                      : "#5c3a08"
                  }
                />
              );
            })}
            {/* <Bar dataKey="Australia 1st Innings" fill="var(--secondary)" /> */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Manhattan;
