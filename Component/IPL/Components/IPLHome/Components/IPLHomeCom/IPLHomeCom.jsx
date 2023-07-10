import React, { useEffect, useState, useRef } from "react";
import styles from "./IPLHomeCom.module.scss";
import Slider from "react-slick";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

// import { Link, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import NewsCard from "../../../../../NewsCard/NewsCard";
import IplLeader from "../../../../../IplLeader/IplLeader";
import VideoCard from "../../../../../VideoCard/VideoCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import noVideo from "../../../../../../public/Images/no-video.png";
import IPLImageSlider from "../../../../../IPLCarousel/IPLImageSlider";
import { getIPLVideoPhotoAPI } from "../../../../../../Constants/Api/Api";
import IplPointTable from "../../../../../IplPointTable/IplPointTable";
import background from "../../../../../../public/Images/no-banner.png";
import HOST from "../../../../../../Constants/host";
import { useRouter } from "next/router";
import Link from "next/link";
import { newsTeamsPlayersApi } from "../../../../../../Constants/Api/Api";
//

const IPLHomeCom = () => {
  //
  const router = useRouter();
  const [CarouselData, setCarouselData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const { cid, season } = router.query;
  // const { pathname } = useLocation();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1400 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1400, min: 1024 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 1024, min: 0 },
      items: 1,
    },
  };

  const sliderRef1 = useRef(null);
  const next1 = () => {
    sliderRef1.current.slickNext();
  };
  const previous1 = () => {
    sliderRef1.current.slickPrev();
  };
  const [settingsIpl, setSettingsIpl] = useState({});

  useEffect(() => {
    const generateSettingsIPL = () => {
      const newSettingsIpl = {
        infinite: true,
        speed: 500,
        slidesToShow: window.innerWidth < 767 ? 1 : 3,
        slidesToScroll: 1,
        arrows: false,
      };
      setSettingsIpl(newSettingsIpl);
    };
    window.addEventListener("resize", generateSettingsIPL);
    generateSettingsIPL();
    return () => {
      window.removeEventListener("resize", generateSettingsIPL);
    };
  }, []);
  // const navigate = useNavigate();
  // const Navigation = useCallback(() => {
  //   let value = "/error";
  //   navigate(value);
  // }, [navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    newsTeamsPlayersApi(season, "4", "")
      .then((res) => {
        setCarouselData(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
    newsTeamsPlayersApi(season, "", "")
      .then((res) => {
        setNewsData(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
    getIPLVideoPhotoAPI(cid, "Video")
      .then((res) => {
        setVideoData(res.data.data);
        setVisible(true);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [season, cid]);

  return (
    <div className={styles.IPL_home_section}>
      <div className={`${styles.Banner} row`}>
        <div className="col-md-8">
          <Container>
            <IPLImageSlider CarouselData={CarouselData} />
          </Container>
        </div>
        <div className="col-md-4">
          <Container>
            <IplPointTable />
          </Container>
        </div>
      </div>

       {/* <div className={`${styles.IPL} row ${styles.RowGrid}`}>
        <h3 className={styles.IPL__text_ipl}>
         
          leader
        </h3>
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          autoPlay={false}
        >
          <IplLeader
            location="ipl"
            activeGroupTitle="Batting"
            activeFormatsType="batting_most_runs"
            title="Aramco Orange Cap"
            type="runs"
            backColor="linear-gradient(256.23deg, #fa601f 45.4%, #e5c322 99.95%)"
          />
          <IplLeader
            location="ipl"
            activeGroupTitle="Bowling"
            activeFormatsType="bowling_top_wicket_takers"
            title="Aramco Purple Cap"
            type="wicket"
            backColor="linear-gradient(256.23deg, #9334E9 45.4%, #7030AA 99.95%)"
          />

          <IplLeader
            location="ipl"
            activeGroupTitle="Batting"
            activeFormatsType="batting_most_runs_innings"
            title="Highest Score"
            type="score"
            backColor="linear-gradient(256.23deg, #153279 45.4%, #0F2354 99.95%)"
          />
          <IplLeader
            location="ipl"
            activeGroupTitle="Bowling"
            activeFormatsType="bowling_best_bowling_figures"
            title="Best Bowling Perfomance"
            type="BBI"
            backColor="linear-gradient(256.23deg, #16347C 45.4%, #0F2354 99.95%)"
          />
        </Carousel>
      </div>  */}
      {/* <div className={`${styles.row} ${styles.HomeRow} ${styles.iplRow}`}>
        <Container>
          <h3 className={`${styles.IPL__text} ${styles.textUppercase}`}>
            Leaders
          </h3>
          <Slider ref={sliderRef1} {...settingsIpl}>
            <IplLeader
              location="ipl"
              activeGroupTitle="Batting"
              activeFormatsType="batting_most_runs"
              title="Aramco Orange Cap"
              type="runs"
              backColor="linear-gradient(256.23deg, #fa601f 45.4%, #e5c322 99.95%)"
            />
            <IplLeader
              location="ipl"
              activeGroupTitle="Bowling"
              activeFormatsType="bowling_top_wicket_takers"
              title="Aramco Purple Cap"
              type="wicket"
              backColor="linear-gradient(256.23deg, #9334E9 45.4%, #7030AA 99.95%)"
            />

            <IplLeader
              location="ipl"
              activeGroupTitle="Batting"
              activeFormatsType="batting_most_runs_innings"
              title="Highest Score"
              type="score"
              backColor="linear-gradient(256.23deg, #153279 45.4%, #0F2354 99.95%)"
            />
            <IplLeader
              location="ipl"
              activeGroupTitle="Bowling"
              activeFormatsType="bowling_best_bowling_figures"
              title="Best Bowling Perfomance"
              type="BBI"
              backColor="linear-gradient(256.23deg, #16347C 45.4%, #0F2354 99.95%)"
            />
          </Slider>
          <div
            className={styles.preNextButton}
            style={{
              display: "flex",
              justifyContent: "end",
              width: "auto",
              backgroundColor: "transparent",
            }}
          >
            <button className={styles.preMoreBtn} onClick={previous1}>
              <MdKeyboardArrowLeft />
            </button>
            <button className={styles.preMoreBtn} onClick={next1}>
              <MdKeyboardArrowRight />
            </button>
          </div>
        </Container>
      </div> */}

      <div className={`${styles.Videos} row ${styles.RowGrid}`}>
        <div className={styles.space}>
          <div className={styles.type_group}>
            <div>
              <h3 className={styles.IPL__text}> videos </h3>
            </div>
          </div>
          <h3 className={styles.viewall}>
            <Link
              className={styles.link_color}
              href={`/ipl/${season}/${cid}/videos/`}
            >
              view_all
            </Link>
          </h3>
        </div>
        <Carousel
          className=""
          swipeable={true}
          draggable={true}
          responsive={responsive}
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          autoPlay={false}
        >
          {visible === true && videoData.length === 0 ? (
            <h6 className="mx-3"> no_video ...</h6>
          ) : (
            videoData.map((item, index) => {
              return (
                <div key={index} className="px-2 py-1">
                  <VideoCard source={noVideo} data={item} />
                </div>
              );
            })
          )}
        </Carousel>
      </div>

      <div className={`${styles.News} row ${styles.RowGrid}`}>
        <div className={styles.space}>
          <div className={styles.type_group}>
            <div>
              <h3 className={styles.IPL__text}> news </h3>
            </div>
          </div>
          <div>
            <h3 className={styles.viewall}>
              <Link
                className={styles.link_color}
                href={`/ipl/${season}/${cid}/news/`}
              >
                view_all
              </Link>
            </h3>
          </div>
        </div>
        <Carousel
          className="mx-2"
          swipeable={true}
          draggable={true}
          responsive={responsive}
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          autoPlay={false}
        >
          {newsData.length === 0 ? (
            <h6 className="mx-3">No News...</h6>
          ) : (
            newsData.map((item, index) => {
              return (
                <Link
                  key={index}
                  className={styles.link_color}
                  href={`/cricket-news/${item.news_category}/${item.slug}/`}
                >
                  <div className="px-2">
                    <NewsCard
                      title={item.title}
                      date={item.date}
                      source={
                        item.file_uri === "" || item.file_uri === null
                          ? `${background}/`
                          : item.file_name === "" || item.file_name === null
                          ? `${background}/`
                          : `${HOST}${item.file_uri}/${item.file_name}/`
                      }
                    />
                  </div>
                </Link>
              );
            })
          )}
        </Carousel>
      </div>
    </div>
  );
};
export default IPLHomeCom;
