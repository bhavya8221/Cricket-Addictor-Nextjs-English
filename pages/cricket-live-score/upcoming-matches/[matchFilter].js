import { useRouter } from "next/router";
import ScoreBoxNew from "../../../Component/ScoreBoxNew/ScoreBoxNew";

function MatchFilter() {
  const router = useRouter();
  const { teams, groups, start_date, matchFilter } = router.query;
  return (
    <ScoreBoxNew type="upcoming-matches"
      
    />
  );
}

export default MatchFilter;
