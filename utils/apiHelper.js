// /* eslint-disable no-shadow */
// /* eslint-disable no-catch-shadow */
// import {useState, useEffect} from 'react';

// const useFetch = (url, callback) => {
// //   const [data, setData] = useState('loading');
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   useEffect(() => {
//     console.log(`https://node.cricketaddictor.com:3000/api/v1/${url}`,"data,url");

//     try {
//         fetch(`https://node.cricketaddictor.com:3000/api/v1/${url}`)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data,"data");
//           setResponse(data);
      
//         }).catch(error=>{
//             setError(error)
//         });
//     } catch (error) {
//         setError(error)
//     }
 
//   }, [url]);

//   return [response,error,isLoading];
// };

// const useFetchPost = (url, data) => {
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);

//       try {
//         const requestOptions = {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//         };

//         const res = await fetch(
//           'https://www.aasabie.com/api/v1/' + url,
//           requestOptions,
//         );
//         const json = await res.json();

//         setResponse(json);
//         setIsLoading(false);
//       } catch (error) {
//         setError(error);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [url, data]);

//   return {response, error, isLoading};
// };

// const useFetchPostFormData = url => {
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchData = async formData => {
//     setIsLoading(true);

//     try {
//       const requestOptions = {
//         method: 'POST',
//         body: formData,
//       };

//       const res = await fetch(
//         'https://node.cricketaddictor.com:3000/api/v1/' + url,
//         requestOptions,
//       );
//       const json = await res.json();

//       setResponse(json);
//       setIsLoading(false);
//     } catch (error) {
//       setError(error);
//       setIsLoading(false);
//     }
//   };

//   return {fetchData, response, error, isLoading};
// };
// export {useFetchPostFormData};

// export {useFetchPost};

// export {useFetch};



// const useStore = create(set => ({
//   data: null,
//   loading: false,
//   fetchData: async () => {
//     set({ loading: true });
//     const response = await fetch('https://api.example.com/data');
//     const data = await response.json();
//     set({ data, loading: false });
//   },
// }));


const BASE_URL = "https://node.cricketaddictor.com:3000/api/v1/";

export const homeBannerNewsApi = async (value1) => {
  let config = {
    news_type: value1,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/redis/get-latest-post",
    config
  );
};
import {create} from 'zustand';
import axios from 'axios';
// Create Zustand store
export const useStore = create(set => ({
  crouselData:[],
  latestData:null,
  newsData:[],
  scoreData: [],
  loading: false,
  iccHome:[],
  iplHomeData:[],
  homeBannerNewsApi: async (value) => {
    set({ loading: true });
    const response = await axios.post(
      "https://node.cricketaddictor.com:3000/api/v1/redis/get-latest-post",
       {news_type: value}
    );
    set({crouselData:response.data.data.slice(0, 4),loading:false })
    set({latestData:response.data.data.slice(0, 6),loading:false })
    set({newsData:response.data.data,loading:false })
  },
  newLiveMatchApi: async (url,value) => {
    set({ loading: true });
    const response = await axios.post(
      `${BASE_URL}${url}`,
      {type: value}
    )
    set({ scoreData: response.data.data ,loading:false });
  },
  newRecentMatchApi: async (url,value) => {
    set({ loading: true });
    const response = await axios.post(
      `${BASE_URL}${url}`,
      {type: value}
    )
        set({ scoreData: response.data.data ,loading:false });  
  },
  newUpcommingMatchApi: async (url,value) => {
    set({ loading: true });
    const response = await axios.post(
      `${BASE_URL}${url}`,
      {type: value}
    )
    set({ scoreData: response.data.data ,loading:false });  
  },
  iCCRankingHomePage:async (url,value1, value2, value3) => {
    let config = {
      groups_type: value1,
      match_for: value2,
      groups: value3,
    };
    set({ loading: true });
    const response = await axios.post(
      `${BASE_URL}${url}`,
      config
    )
    set({ iccHome: response.data.data ,loading:false });  
  },
  iPLHomeLeader:async (url,value) => {
    set({ loading: true });
    const response = await axios.post(
      `${BASE_URL}${url}`,
      {cid: value}
    )
    set({ iplHomeData: response.data.data ,loading:false });  
  },
}));



export const iPLHomeLeader = async (value) => {
  let config = {
    cid: value,
  };
  return await axios.post(
    "https://node.cricketaddictor.com:3000/api/v1/cricket/ipl/leaders",
    config
  );
};