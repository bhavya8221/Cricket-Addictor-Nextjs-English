import { useRouter } from "next/router";
import SeriesStats from "../../../../../../Component/SeriesStats/SeriesStats";
import HOST from "../../../../../../Constants/host";


function Index() {
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
    const MetaDescription = `Check out ${Metatitle} Stats on Cricketaddictor`;
    const Canonical = `${HOST}cricket-series/${status}/${cid}/${Canonicalurl}/stats/`;
  
    return <SeriesStats  Metatitle={Metatitle}
    MetaDescription={MetaDescription}
    Canonical={Canonical}/>
}

export async function getServerSideProps() {
    return { props: { products: "hello" } };
  }

export default Index;