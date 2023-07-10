import React, { useEffect, useState } from "react";
import styles from "../../styles/Footer.module.scss";
import fb_logo from "../../public/Images/image 4.png";
import insta_logo from "../../public/Images/image 7.png";
import youTube_logo from "../../public/Images/image 8.png";
import twitter_logo from "../../public/Images/image 9.png";
import Link from "next/link";
import footerBack from "../../public/Images/footerBack.png"
import slugify from "react-slugify";
import HOST from "../../Constants/host";
import dataList from "../../Common/data.json";
import { fantasyPlayer } from "../../Constants/Api/Api";
import Image from "next/image";

const Footer = () => {
  const [player, setPlayer] = useState([]);
console.log(dataList.data.series,"check footer data")
  useEffect(() => {
    fantasyPlayer()
      .then((res) => {
        setPlayer(res.data.data);
      })
      .catch((e) => {});
  }, []);

  return (
    <div className={styles.footer_section}>
      <div className={styles.footer_background}>
          <Image src={footerBack} className={styles.image}/>
        <div className={`row ${styles.footer_sectionchild} pt-3`}>
          <hr className={styles.hr1}/>
          {/* <h2 className={styles.footer_heading}>Cricket Addictor</h2> */}
          {/* col 1 */}
          <div className="col-xs-12 col-md-4">
            <div>
              <h3 className={`${styles.color_red} ${styles.uppercase_text}`}>
                Team
              </h3>
              {dataList.data.teams.map((item, index) => {
                return (
                  <li  key={index} style={{cursor:"pointer"}}
                  onClick={() => {
                    const path = `/teams/men/${item.tid}/${slugify(
                      item.title
                    )}-cricket-team/`;
                    router.push(path);
                  }}
                >
                  {item.title} National Cricket Team
                  </li>
                );
              })}
            </div>
          </div>
          {/* col2  */}

          <div className="col-xs-12 col-md-5">
            <div>
              <h3 className={`${styles.color_red} ${styles.uppercase_text}`}>
                Events
              </h3>
              {dataList.data.series.map((item, index) => {
                return (
                  <li  key={index} style={{cursor:"pointer"}}
                  onClick={() => {
                    const path = `/cricket-series/${
                      item.status === "upcoming"
                        ? "fixture"
                        : item.status
                    }/${item.cid}/${slugify(item.title)}-${
                      item.season
                    }/schedule/`;
                    router.push(path);
                  }}
                >
                  {item.title}&nbsp;{item.season}
                  </li>
                );
              })}
            </div>
          </div>
          {/* col 3 */}
          {/* <div className="col-xs-12 col-md-2">
            <div  >
              <h3 className={`${styles.color_red} ${styles.uppercase_text}`}>
                Player
              </h3>
              {player.map((item, index) => {
                return (
                  <li key={index}>
                    <Link
                      href={
                        item.nationality === null || item.nationality === ""
                          ? "#"
                          : `players/${slugify(item.nationality)}/${
                              item.pid
                            }/${slugify(item.title)}/`
                      }
                      className={styles.link}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </div>
          </div> */}
          <div className="col-xs-12 col-md-1">
            <div>
              <h3 className={`${styles.color_red} ${styles.uppercase_text}`}>
                IPL
              </h3>
              {dataList.data.IPL.map((item, index) => {
                return (
                  <li key={index}>
                    <Link
                      href={`/ipl/ipl-${item.season}/${item.cid}/`}
                      key={index}
                      className={styles.link}
                    >
                      IPL {item.season}
                    </Link>
                  </li>
                );
              })}
            </div>
          </div>
          {/* col 4 */}
          <div className="col-xs-12 col-md-2">
            <div>
              <h3 className={`${styles.color_red} ${styles.uppercase_text}`}>
                Site Link
              </h3>
              <li>
                <Link href="/about-us/"  className={styles.link}>About Us</Link>
              </li>
              <li>
                <Link href="/dmca/"  className={styles.link}>DMCA</Link>
              </li>
              <li>
                <Link href="/disclaimer/"  className={styles.link}>Disclaimer</Link>
              </li>
              <li>
                <Link href="/copyright-notice/"  className={styles.link}>Copyright Notice</Link>
              </li>
              <li>
                <Link href="/online-privacy-policy/"  className={styles.link}>
                  Privacy And Cookies Policy
                </Link>
              </li>

              <li>
                <a href={`${HOST}sitemap.xml`} target="_blank"  className={styles.link}>Sitemap</a>
              </li>
              <li>
                <Link href="/contact/"  className={styles.link}>Contact Us</Link>
              </li>
            </div>
          </div>
          {/* <div className={styles.media_heading}>Social Media</div>
          <div className="col-md-3 col-xs-12">
            <div className={styles.socialLogo_section}>
              <Image
                src={fb_logo}
                alt="images"
                className={styles.social_img}
                onClick={() => {
                  window.open(
                    "https://www.facebook.com/CricAddictors/",
                    "_blank"
                  );
                }}
                width={10}
                height={10}
              />
              <Image
                src={insta_logo}
                alt="images"
                className={styles.social_img}
                onClick={() => {
                  window.open(
                    "https://www.instagram.com/cricaddictor/",
                    "_blank"
                  );
                }}
                width={10}
                height={10}
              />
              <Image
                src={youTube_logo}
                alt="images"
                className={styles.social_img}
                onClick={() => {
                  window.open(
                    "https://www.youtube.com/channel/UCtge6y7wl3QtuRJvwtYPYdg",
                    "_blank"
                  );
                }}
                width={10}
                height={10}
              />
              <Image
                src={twitter_logo}
                alt="images"
                className={styles.social_img}
                onClick={() => {
                  window.open("https://twitter.com/AddictorCricket", "_blank");
                }}
                width={10}
                height={10}
              />
            </div>
          </div>
          <div className="col-md-9 col-xs-12">
            <h4 className={styles.copyright_section}>Copyright 2023</h4>
          </div> */}
        </div>
        <hr/>
        <p>© 2012 - 2023 Sportzwiki Media Pvt. Ltd. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
