import React, { useEffect, useState } from "react";
import styles from  "./IPLBanner.module.scss";
import trophy from "../../../../../../../../../public/Images/Medal.png";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
// import { useParams, useLocation, Link } from "react-router-dom";
import {
  IPLMatchTeamApi,
  IPLTeamDetailApi,
  iPLMatchTeamApi,
  iPLTeamDetailApi,
} from "../../../../../../../../../Constants/Api/Api";
import NoBanner from "../../../../../../../../../public/Images/no-banner-player.png";
import HOST from "../../../../../../../../../Constants/host";
import { Col, Row } from "react-bootstrap";
import slugify from "react-slugify";
import BreadcrumbsSchema from "../../../../../../../../../Common/BreadcrumbsSchema/BreadcrumbsSchema";
 
import { useRouter } from "next/router";
import Link from "next/link";

const IPLBanner = () => {
  const router=useRouter()
  const [bannerData, setBannerData] = useState({});
  const [teamLogo, setTeamLogo] = useState([]);
  const { tid, pid, gender, cid, season } = router.query
  // const navigate = useNavigate();
  const pathname =router.asPath
  // const Navigation = useCallback(
  //   (value1, value2) => {

  //     let value = `/error/${value1}/${value2}`;
  //     navigate(value);
  //   },
  //   [navigate]
  // );

  useEffect(() => {
    iPLMatchTeamApi(cid)
      .then((res) => {
        setTeamLogo(res.data.data.rows);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });

    iPLTeamDetailApi(tid)
      .then((res) => {
        setBannerData(res.data.data);
      })
      .catch((e) => {
        // Navigation(e.code, e.message);
      });
  }, [cid, tid, pid, pathname, gender]);

  const articleBreadcrumb = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${HOST}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "All IPL",
        item: "/ipl/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `IPL ${season}`,
        item: `${HOST}$${pathname.split("/")[1]}/${pathname.split("/")[2]}/${
          pathname.split("/")[3]
        }/`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name:
          pathname.split("/")[4] === undefined
            ? "IPL Home"
            : pathname.split("/")[4],
        item: `${HOST}${pathname.split("/")[1]}/${pathname.split("/")[2]}/${
          pathname.split("/")[3]
        }/${pathname.split("/")[4]}/`,
      },
    
      
    ],
  };



  return (
    <>
      <div className={styles.IPL_flagImageRow}>
        {/* <Helmet>
          <title itemprop="name">
            {pathname.split("/")[4] === undefined
              ? `इंडियन प्रीमियर League ${season.split("-")[1]}`
              : `इंडियन प्रीमियर League ${season.split("-")[1]} ${t(
                  pathname.split("/")[4]
                )}`}
          </title>

          <meta
            name="description"
            content={
              pathname.split("/")[8] === undefined
                ? ` IPLT20 ${season} लाइव क्रिकेट स्कोर, IPL मैच अपडेट, फिक्स्चर, परिणाम, News, फोटो और Videos देखें`
                : `क्रिकेट एडिक्टर पर  इंडियन प्रीमियर League ${
                    season.split("-")[1]
                  } ${t(pathname.split("/")[8])} देखें`
            }
          />
          <link
            rel="canonical"
            href={
              pathname.split("/")[4] === undefined
                ? `${HOST}ipl-${season}/`
                : `${HOST}ipl-${season}/${pathname.split("/")[4]}/${
                    pathname.split("/")[5]
                  }/${pathname.split("/")[6]}/${pathname.split("/")[7]}/${pathname.split("/")[8]}`
            }
          />
          <script type="application/ld+json">
            {JSON.stringify(articleBreadcrumb)}
          </script>
        </Helmet> */}
        {pathname.split("/")[6] === "men" ? (
          <div className={styles.Breadcrums} style={{ padding: "5px 15px" }}>
            {/* <BreadcrumbsSchema data={articleBreadcrumb.itemListElement} /> */}
            <ol
              className={styles.breadcrumb}
              style={{ alignItems: "center", margin: "0px" }}
            >
              {articleBreadcrumb.itemListElement.map((breadcrumb, index) => (
                <BreadcrumbsSchema
                  key={index}
                  label={breadcrumb.name}
                  url={breadcrumb.item}
                  isActive={
                    index === articleBreadcrumb.itemListElement.length - 1
                  }
                  isLast={
                    index === articleBreadcrumb.itemListElement.length - 1
                  }
                />
              ))}
            </ol>
          </div>
        ) : null}
        <Col style={{display:"contents"}}>
          {teamLogo.length === 0
            ? null
            : teamLogo.map((item, index) => {
                return item.tid === Number(tid) ? null : (
                  <>
                    <Link
                      className={styles.link_color}
                      // to={`/teams/${gender}/${item.tid}/${title}`}
                      href={`/ipl/${season}/${item.cid}/teams/${gender}/${
                        item.tid
                      }/${slugify(item.title)}/`}
                    >
                      <div className={styles.flagContain} key={index}>
                        <div className={styles.flagImage}>
                          <img
                            src={item.logo_url}
                            height="60px"
                            width="60px"
                            className={styles.img}
                            alt="images"
                          />
                        </div>
                        <div>
                          <h6>{item.title}</h6>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}
        </Col>
      </div>
      <div className="IPL_Banner">
        <div className="bannerImage">
          <Row className="teamBannerDetails">
            <Col sm={12} md={12} className="details">
              <div className="info">
                <h1>{bannerData.title}</h1>
                <h1>Cricket Team</h1>
                <div className="official_site">Official Team Site</div>
                <div className="trophy">
                  {" "}
                  <img
                    src={trophy}
                    width="12px"
                    height="26px"
                    alt="images"
                  />{" "}
                  <b> ODI:{bannerData.world_cup_odi}</b>
                </div>
                <div className="trophy">
                  {" "}
                  <img
                    src={trophy}
                    width="12px"
                    height="26px"
                    alt="images"
                  />{" "}
                  <b> T20:{bannerData.world_cup_20i}</b>
                </div>
                <h2>
                  Coach :
                  {bannerData.coach === "" || bannerData.coach === null
                    ? " --"
                    : bannerData.coach}
                </h2>
                <h2>
                  Caption :
                  {bannerData.captain === "" || bannerData.captain === null
                    ? " --"
                    : bannerData.captain}
                </h2>

                <div className="social-icons">
                  <AiFillInstagram className="icon" />
                  <AiOutlineTwitter className="icon" />
                  <BsFacebook className="icon" />
                </div>
              </div>
            </Col>
            {/* <div className="col-lg-6 col-xs-12">
                <div className="child-ipl-new"></div>
              </div> */}
          </Row>
          <img
            src={
              bannerData.banner_image === "" || bannerData.banner_image === null
                ? NoBanner
                : HOST + bannerData.banner_image
            }
            // width="1536px"
            width="100%"
            alt="images"
            className="imageBanner"
          />
        </div>
      </div>
    </>
  );
};

export default IPLBanner;
