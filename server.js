import * as axios from "axios";

export function searchResults_getAllPaged(data) {
  return axios.post(URL_PREFIX + "/api/searchresults", data);
}

export function searchResultsCoaches_getAllPaged(data) {
  return axios.post(URL_PREFIX + "/api/searchresults/coaches", data);
}

export function searchResults_getAllSchools(data) {
  return axios.post(URL_PREFIX + "/api/searchresults/schools", data);
}

















