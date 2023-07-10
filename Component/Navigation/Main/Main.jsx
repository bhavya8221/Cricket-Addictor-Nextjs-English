import React, { useEffect } from "react";
import Image from "next/image";
import classname from "classnames";
import Container from "react-bootstrap/Container";
import logo from "../../../public/Images/CALOGO.png";
import {
  FaGlobe,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";
import { NavDropdown } from "react-bootstrap";
import NextLink from "next/link";

import { useState } from "react";
import Fb from "../../../public/Images/fb_social.png";
import Twiter from "../../../public/Images/twiter_social.png";
import Insta from "../../../public/Images/insta_social.png";
import Youtube from "../../../public/Images/youtube_social.png";

import styles from "./Main.module.scss";
import { useRouter } from "next/router";


function Main() {
  const router =useRouter()

  function handle() {
  router.replace("/")
    // window.location.href = "/";
  }
  return (
    <>
      <div className={styles.mainNav_section}>
        <div className={styles.Main}>
          <div className={styles.logo__bar}>
            <div className={styles.left__side}>
              <NextLink href={"/"} onClick={handle} className={styles.link}>
                <Image src={logo} alt="logo" className={styles.img}/>
              </NextLink>
              <div className={styles.triangleCorner} />
            </div>
            <div className={styles.right__side}>
              <div
                className={classname(
                  styles.language,
                  styles.s_icon,
                  styles.margin_lang
                )}
              >
                <div>
                  <FaGlobe
                    className=""
                    style={{
                      marginRight: 2,
                      alignSelf: "center",
                      marginTop: 3,
                    }}
                    color="white"
                  />
                </div>

                <div>
                  <NavDropdown title="ENG" id="navbarScrollingDropdown">
                    <NavDropdown.Item>ENG</NavDropdown.Item>
                    <NavDropdown.Item>हिन्दी</NavDropdown.Item>
                  </NavDropdown>
                </div>
              </div>

              <Image
                src={Fb}
                className={styles.social_icon_fb__nav}
                onClick={() => {
                  window.open(
                    "https://www.facebook.com/CricAddictors",
                    "_blank"
                  );
                }}
                
                width={10}
                height={10}
                alt="images"
              />
              <Image
                src={Twiter}
                className={styles.social_icon_nav}
                onClick={() => {
                  window.open("https://twitter.com/AddictorCricket", "_blank");
                }}
               
                width={10}
                height={10}
                alt="images"
              />
              <Image
                src={Insta}
                className={styles.social_icon_nav}
                onClick={() => {
                  window.open(
                    "https://www.instagram.com/cricaddictor",
                    "_blank"
                  );
                }}
               
                width={10}
                height={10}
                alt="images"
              />
              <Image
                src={Youtube}
                className={styles.social_icon_youtube__nav}
                onClick={() => {
                  window.open(
                    "https://www.youtube.com/channel/UCtge6y7wl3QtuRJvwtYPYdg",
                    "_blank"
                  );
                }}
               
                width={10}
                height={10}
                alt="images"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
