import React, { memo } from "react";
import styles from  "./LatestNewsCard.module.scss";
import HOST from "../../Constants/host";
// import { HomeNewsApi, NewsCategoryApi } from "../../Constants/Api/Api";
import background from "../../public/Images/no-img.png";

import slugify from "react-slugify";
import Link from "next/link";
import { useRouter } from "next/router";

function LatestNewsCard(props) {
  const router = useRouter();
  // const [LatestData, setLatestData] = useState([]);

  function handleMoreNews() {
    router.replace("/cricket-news/all/")
    // window.location.href = "/cricket-news/all/";
  }
  // const navigate = useNavigate();
  // const Navigation = useCallback(
  //   (value1, value2) => {

  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  // useEffect(() => {
  //   HomeNewsApi("","")
  //     .then((res) => {
  //       setLatestData(res.data.data);
  //     })
  //     .catch((e) => {
  //       //   // Navigation(e.code, e.message);
  //     });
  // }, []);

  return (
    <>
      <div className={styles.latestNews_section}>
        <div className={styles.scrollStyle}>
          {props.data 
             && props.data.map((item, index) => {
                return (
                  <div key={index} >
                    <Link
                      className={styles.link_color}
                      href={
                        item.category === null ||
                        item.category.length === 0 ||
                        item.category.slug === null
                          ? `/${item.news_category}/${item.slug}/`
                          : `/${item.news_category}/${slugify(
                              item.category.slug
                            )}/${item.slug}/`
                      }
                    >
                      <div
                        className={styles.news_card}
                        style={{
                          backgroundImage:
                            item.attachment === [] ||
                            item.attachment.length === 0 ||
                            item.attachment === undefined
                              ? `url(${background})`
                              : item.attachment[0].file_name === ""
                              ? `url(${background})`
                              : `url(${HOST}${item.attachment[0].file_uri}/${item.attachment[0].file_name})`,
                        }}
                      >
                        <div className={styles.captions}>
                          <button className={styles.ltsBtn}>
                            {item.category === null ||
                            item.category === [] ||
                            item.category === {} ||
                            item.category === ""
                              ? "Cricket News"
                              : item.category[0] === undefined
                              ? item.category.name
                              : item.category[0].name}
                          </button>
                        </div>
                      </div>
                      <p
                        className={styles.ltstitle}
                        dangerouslySetInnerHTML={{
                          __html: item.title,
                        }}
                      ></p>
                      {/* <p
                        dangerouslySetInnerHTML={{
                          __html: fantasyBlog.match_description,
                        }}
                      ></p> */}
                      <p className={styles.ltsdate}>{item.post_date}</p>
                    </Link>
                    <div className={styles.line} />
                  </div>
                );
              })}
        </div>
        <button className={styles.ltsMoreBtn} onClick={handleMoreNews}>
      More News
        </button>
      </div>
    </>
  );
}

export default memo(LatestNewsCard);
