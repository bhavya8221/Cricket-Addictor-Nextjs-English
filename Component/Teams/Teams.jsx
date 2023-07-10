import React from "react";
import TeamCard from "./Components/TeamCard/TeamCard";
import HOST from "../../Constants/host";
import MenuButton from "../MenuButton/MenuButton";
import { useRouter } from "next/router";
import Head from "next/head";
import Breadcrumbs from "../../Common/BreadcrumbsSchema/Breadcrumbs";

function Teams(props) {
  const router = useRouter();
  const  pathname  = router.asPath;
  const menus = [
    {
      title: <>international men</>,
      path: "/teams/men",
    },
    {
      title: <>international women</>,
      path: "/teams/women",
    },
  ];
  const articleBreadcrumb = {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${HOST}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Teams",
        item: `${HOST}${pathname}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name:
          pathname.split("/")[2] === "men"
            ? "International Men"
            : "International Women",
        item: `${HOST}${pathname}`,
      },
    ],
  };
 
  return (
    <div className="teams_section_div">
      <MenuButton
        title="allTeam"
        menuitems={menus}
        pathname={pathname}
        activeMenu={props.active}
      />
      <Head>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleBreadcrumb),
          }}
        />
        {/* <link rel="canonical" href={`${HOST}teams-men/`} /> */}
      </Head>
      <Breadcrumbs itemListElement={articleBreadcrumb.itemListElement} />

      <TeamCard />
    </div>
  );
}

export default Teams;
