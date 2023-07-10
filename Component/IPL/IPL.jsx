import React from "react";
import styles from "./IPL.module.scss";
import IPLYearCard from "./Components/IPLYearCard/IPLYearCard";
import BreadcrumbsSchema from "../../Common/BreadcrumbsSchema/BreadcrumbsSchema";
import HOST from "../../Constants/host";
import MenuButton from "../MenuButton/MenuButton";
import { useRouter } from "next/router";
import Breadcrumbs from "../../Common/BreadcrumbsSchema/Breadcrumbs";
import Head from "next/head";

function IPL() {
  const router = useRouter();
  const pathname = router.asPath;

  const menus = [];
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
        position: 1,
        name: "Ipl",
        item: `${HOST}${pathname}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "All IPL",
        item: `${HOST}${pathname}/`,
      },
    ],
  };
  return (
    <div className={styles.ipl_section}>
      <MenuButton title="All IPL's" menuitems={menus} pathname={pathname} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleBreadcrumb),
          }}
        />{" "}
      </Head>
      <Breadcrumbs itemListElement={articleBreadcrumb.itemListElement} />

      <IPLYearCard />
    </div>
  );
}

export default IPL;
