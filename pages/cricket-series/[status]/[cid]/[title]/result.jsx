import { useRouter } from "next/router";
import SeriesResult from "../../../../../Component/SeriesResult/SeriesResult";
import HOST from "../../../../../Constants/host";

function Result() {
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
  const MetaDescription = `Check out ${Metatitle} Result on Cricketaddictor`;
  const Canonical = `${HOST}cricket-series/${status}/${cid}/${Canonicalurl}/result/`;
  return (
    <SeriesResult
      Metatitle={Metatitle}
      MetaDescription={MetaDescription}
      Canonical={Canonical}
    />
  );
}
export async function getServerSideProps() {
  return { props: { products: "hello" } };
}

export default Result;
