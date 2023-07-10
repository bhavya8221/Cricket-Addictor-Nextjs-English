import { useRouter } from "next/router";
import Teams from "../../../Component/Teams/Teams";

function Index() {
  const router = useRouter();
  const { gender } = router.query;

  if (gender === undefined) return <></>;

  return <Teams active={gender == "men" ? 0 : 1} gender={gender} />;
}

export default Index;
