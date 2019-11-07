import axios from 'axios';

const peopleURL = 'https://swapi.co/api/people/?page=';

const getPageCharacters = async (pageNumber) => {
  const res = await axios.get(peopleURL+pageNumber);  
  return res.data;
}

export { getPageCharacters };