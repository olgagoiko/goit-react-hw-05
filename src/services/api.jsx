import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDc2YWNhZGQxNTRhNzQ0YTQxMTRmNTJlYTM3M2M4YSIsIm5iZiI6MTcyNTIxNjQ4MS4xMTY1NTcsInN1YiI6IjY2ZDRhNmFjZDY3M2MwYWFjMDMwMDNmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.auLobGGLkdwbEI5M70dICcrVV62Km2PDE8n03pEQ8gA';

export default async function fetchData(page = 1, query = '', endPoint) {
  const params = {
    page,
    query,
    api_key: 'ef2c1ec535aea5ba110b3353673b79b3',
  };
  const respons = await axios.get(`${endPoint}`, { params });

  return respons.data;
}
