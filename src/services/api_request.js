const API_REQUEST = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getAPI = async () => {
  const response = await fetch(API_REQUEST);
  const data = await response.json();
  // return data.results;
  const request = data.results;
  const filter = request.map(({ residents, ...spredOfOthers }) => spredOfOthers);
  return filter;
};

export default getAPI;
