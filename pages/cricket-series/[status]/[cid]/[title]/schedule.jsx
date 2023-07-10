import { useState } from "react";
import SeriesSchedule from "../../../../../Component/SeriesSchedule/SeriesSchedule";
import { useRouter } from "next/router";
import HOST from "../../../../../Constants/host";

function Schedule() {
  const router = useRouter();
  const { status, title, cid } = router.query;
  function unslugify(slug) {
    if (slug === undefined) return "";
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const Metatitle = title ? unslugify(title) : "";
  const Canonicalurl = title ? title : "";
  const MetaDescription = `Check out ${Metatitle} Schedule on Cricketaddictor`;
  const Canonical = `${HOST}cricket-series/${status}/${cid}/${Canonicalurl}/schedule/`;

  return (
    <div>
      <SeriesSchedule
        Metatitle={Metatitle}
        MetaDescription={MetaDescription}
        Canonical={Canonical}
      />
    </div>
  );
}

export async function getServerSideProps() {
  return { props: { products: "hello" } };
}

export default Schedule;
