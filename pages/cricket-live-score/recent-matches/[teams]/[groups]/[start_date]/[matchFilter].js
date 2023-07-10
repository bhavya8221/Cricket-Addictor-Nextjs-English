import { useRouter } from "next/router";
import ScoreBoxNew from "../../../../../../Component/ScoreBoxNew/ScoreBoxNew";

function MatchFilter() {
  return(

    <>
    <ScoreBoxNew type="recent-matches" />
  </>
    )
}

export default MatchFilter;
