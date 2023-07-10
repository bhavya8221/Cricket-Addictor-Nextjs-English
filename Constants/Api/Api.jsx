import axios from "axios";

const BASE_URL = "https://node.cricketaddictor.com:3000/api/v1/cricket/";

export const getLiveMatches = async () => {
  try {
    const response = await axios.get(`${BASE_URL}match/live/list`);
    return response.data;
  } catch (error) {
    console.error("API response error:", error);
    throw error;
  }
};

export const newsCategoryApi = async (value, value1, value2, value3) => {
  let config = {
    place_name: value, //pass 'news' for get all news.
    news_type: value1,
    limit: value2,
    page: value3,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/category/post",
    config
  );
};

export const newPrimaryCategory = async (value) => {
  let config = {
    category_type: value,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/category/all-category",
    config
  );
};

export const primarycategoryDesciption = async (value) => {
  let config = {
    primary_slug: value,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/category/details",
    config
  );
};

// Post details
export const blogPostDetailApi = async (value) => {
  let config = {
    slug: value,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/category/post/details",
    config
  );
};

// tages Details
export const articalsDetail = async (value1) => {
  let config = {
    event_id: value1,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/match/news",
    config
  );
};

// Team Player Profile
export const teamPlayerProfile = async (value) => {
  let config = {
    pid: value,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/player/profile",
    config
  );
};

// team List Detail
export const teamListDetailAPI = async (value1, value2, value3) => {
  let config = {
    tid: value1,
    type: value2,
    groups: value3,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/match/teams/list_new/details",
    config
  );
};
// IPL List
export const iPLListApi = async () => {
  return await axios.get(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/match/IPL/list"
  );
};

// player information
export const playersAPI = async (value1, value2, value3, value4) => {
  let config = {
    tid: value1,
    first_letter: value2,
    playing_role: value3,
    format_str: value4,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/player",
    config
  );
};
// ICC Rankings
export const iCCRankingApi = async (value1, value2, value3) => {
  let config = {
    groups_type: value1,
    groups: value2,
    limit: value3,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/iccranks",
    config
  );
};

// Team Player last 5 preformance
export const lasrFivePerformance = async (value, value1, value2, value3) => {
  let config = {
    pid: value,
    format_str: value1,
    limit: value2,
    page: value3,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/player/performance",
    config
  );
};

// player information

//  player Ranking by Fantasy
export const fantasyPlayer = async () => {
  return await axios.get(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/player/ranking"
  );
};
// News of Teams & Players
export const newsTeamsPlayersApi = async (value, value2, value3) => {
  let config = {
    event_id: value,
    limit: value2,
    page: value3,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/match/news",
    config
  );
};
// Get Video & Photos of Players
export const GetPlayerVideoPhotoAPI = async (value, value2) => {
  let config = {
    pid: value,
    file_type: value2,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/player/media",
    config
  );
};

export const homeBannerNewsApi = async (value1) => {
  let config = {
    news_type: value1,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/redis/get-latest-post",
    config
  );
};

// IplLeader
export const iPLHomeLeader = async (value) => {
  let config = {
    cid: value,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/ipl/leaders",
    config
  );
};

export const iCCRankingHomePage = async (value1, value2, value3) => {
  let config = {
    groups_type: value1,
    match_for: value2,
    groups: value3,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/iccranks/home",
    config
  );
};
// New Live match list
export const newLiveMatchApi = async (value) => {
  let config = {
    type: value,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/live/list/new",
    config
  );
};

// New Recent match list
export const newRecentMatchApi = async (value) => {
  let config = {
    type: value,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/recent/list/new",
    config
  );
};

// New Upcomming match list
export const newUpcommingMatchApi = async (value) => {
  let config = {
    type: value,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/upcoming/list/new",
    config
  );
};

// team filter
export const teamFilterAPI = async (value1, value2, value3) => {
  let config = {
    teams: value1,
    groups: value2,
    start_date: value3,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/recentlist/filter",
    config
  );
};
// Get Videos Type API
export const getVideoTypeAPI = async (value, value2) => {
  let config = {
    file_type: value,
    video_for: value2,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/video",
    config
  );
};

// Series API
export const seriesApi = async (value1, value2, value3) => {
  let config = {
    limit: value1,
    status: value2,
    page: value3,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/match/series/list",
    config
  );
};

export const notifyApi = async (value1) => {
  let config = {
    match_id: value1,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/users/notify",
    config,
    {
      headers: {
        "x-access-token": `${localStorage.getItem("authTokenAccessLogin")}`,
      },
    }
  );
};
export const notifyListAPI = async () => {
  return await axios.get(
    "https://node.cricketaddictor.com:3000/api/v1/users/allnotifyuser",
    {
      headers: {
        "x-access-token": `${localStorage.getItem("authTokenAccessLogin")}`,
      },
    }
  );
};

// Series Matchs
export const seriesMatchAPI = async (value1, value2, value3) => {
  let config = {
    format_str: value1,
    cid: value2,
    status_str: value3,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/match/seriesmatch/list",
    config
  );
};

// Competition Stats Type
export const competitionStatsTypeAPI = async (value1, value2, value3) => {
  let config = {
    formats: value1,
    group_title: value2,
    cid: value3,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/competitions/stats/type",
    config
  );
};

// Competition Stats
export const competitionStatsAPI = async (
  value1,
  value2,
  value3,
  value4,
  value5
) => {
  let config = {
    formats: value1,
    group_title: value2,
    cid: value3,
    types_key: value4,
    limit: value5,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/competitions/stats",
    config
  );
};

// Live match details by Matche ID
export const liveMatchByIdApi = async (value) => {
  let config = {
    match_id: value,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/match/live/details",
    config
  );
};

// Recent Match Details by Match ID
export const recentMatcByIdApi = async (value) => {
  let config = {
    match_id: value,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/match/recentlist/details",
    config
  );
};
// Upcoming Match Details by Match ID
export const upcomingMatchByIdApi = async (value) => {
  let config = {
    match_id: value,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/upcoming/details",
    config
  );
};

// Live Commentary
export const liveCommentaryApi = async (value1, value2) => {
  let config = {
    match_id: value1,
    latest_inning_number: value2,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/match/live/commentary",
    config
  );
};

// Recent Commentary
export const recentCommentaryApi = async (value1, value2) => {
  let config = {
    match_id: value1,
    latest_inning_number: value2,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/match/recentlist/commentary",
    config
  );
};

// Live Scorecard
export const liveScorecardApi = async (value) => {
  let config = {
    match_id: value,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/match/live/scorecard",
    config
  );
};
// Recent Scorecard
export const recentScorecardApi = async (value) => {
  let config = {
    match_id: value,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/match/recentlist/scorecard",
    config
  );
};

// Live Playing XI
export const livePlayersApi = async (value) => {
  let config = {
    match_id: value,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/match/live/players",
    config
  );
};

// Recent Playing XI
export const recentPlayersApi = async (value) => {
  let config = {
    match_id: value,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/match/recentlist/players",
    config
  );
};

// Get Video & Photos
export const getVideoPhotoAPI = async (value, value2, value3) => {
  let config = {
    match_id: value,
    file_type: value2,
    video_for: value3,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/match/media",
    config
  );
};

// team manhattan
export const manhattanAPI = async (value1, value2) => {
  let config = {
    match_id: value1,
    number: value2,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/match/live/manhattan",
    config
  );
};

// Wagon wheel
export const wagonsWheelAPI = async (value1, value2, value3, value4) => {
  let config = {
    match_id: value1,
    number: value2,
    batsmam_id: value3,
    bowler_id: value4,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/match/live/wagons_Wheel",
    config
  );
};

// team Wise Match Squads List
export const teamWiseMatchSquadsAPI = async (value) => {
  let config = {
    tid: value,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/match/teams/squads",
    config
  );
};

// team Wise Match List
export const teamWiseMatchListAPI = async (value1, value2, value3, value4) => {
  let config = {
    tid: value1,
    status: value2,
    page: value3,
    limit: value4,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/match/teams/m_list",
    config
  );
};

export const getIPLVideoPhotoAPI = async (value, value2) => {
  let config = {
    sid: value,
    file_type: value2,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/IPL/media",
    config
  );
};

// Competitionstanding
export const competitionStandingAPI = async (value) => {
  let config = {
    competition_id: value,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/competitions/standing",
    config
  );
};

// IPL match team API
export const iPLMatchTeamApi = async (value) => {
  let config = {
    cid: value,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/match/teams/list",
    config
  );
};

export const iPLTeamDetailApi = async (value) => {
  let config = {
    tid: value,
  };
  return await axios.post("https://node.cricketaddictor.com:3000/api/v1/cricket/team/IPL/details", config);
};
// IPL Team Schedule And Result
export const iPLScheduleResultApi = async (
  value1,
  value2,
  value3,
  value4,
  value5
) => {
  let config = {
    tid: value1,
    cid: value2,
    limit: value3,
    page: value4,
    status_str: value5,
  };
  return await axios.post("https://node.cricketaddictor.com:3000/api/v1/cricket/team/IPL/matches", config);
};


// Auth
export const signUpAPI = async (value1, value2, value3, value4) => {
  let config = {
    name: value1,
    email_id: value2,
    password: value3,
    confirm_Password: value4,
  };
  return await axios.post("https://node.cricketaddictor.com:3000/api/v1/users/register", config);
};

export const loginAPI = async (value1, value2) => {
  let config = {
    email_id: value1,
    password: value2,
  };
  return await axios.post("https://node.cricketaddictor.com:3000/api/v1/users/login", config);
};
export const logoutAPI = async (value1, value2) => {
  let config = {
    accessToken: value1,
    refreshToken: value2,
  };
  return await axios.post("https://node.cricketaddictor.com:3000/api/v1/users/logout", config);
};
export const googleLoginAPI = async (
  value1,
  value2,
  value3,
  value4,
  value5,
  value6
) => {
  let config = {
    name: value1,
    email: value2,
    given_name: value3,
    family_name: value4,
    picture: value5,
    googleId: value6,
  };
  return await axios.post("https://node.cricketaddictor.com:3000/api/v1/auth/google", config);
};
export const facebookLoginAPI = async (value1, value2, value3) => {
  let config = {
    name: value1,
    email: value2,
    userId: value3,
  };
  return await axios.post("https://node.cricketaddictor.com:3000/api/v1/auth/facebook", config);
};

export const profilAPI = async () => {
  return await axios.get("https://node.cricketaddictor.com:3000/api/v1/users/profile", {
    headers: {
      "x-access-token": `${localStorage.getItem("authTokenAccessLogin")}`,
    },
  });
};

export const OtpSendAPI = async (value1) => {
  let config = {
    email_id: value1,
  };
  return await axios.post("https://node.cricketaddictor.com:3000/api/v1/users/sendotp", config);
};
export const VerifyOtpAPI = async (value1, value2) => {
  let config = {
    email_id: value1,
    otp: value2,
  };
  return await axios.post("https://node.cricketaddictor.com:3000/api/v1/users/verifyotp", config);
};

export const ResetPasswordAPI = async (value1, value2, value3, value4) => {
  let config = {
    email_id: value1,
    otp: value2,
    password: value3,
    confirm_Password: value4,
  };
  return await axios.post("https://node.cricketaddictor.com:3000/api/v1/users/resetpassword", config);
};
