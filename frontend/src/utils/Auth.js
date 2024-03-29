export const BASE_URL = 'https://api.mesto.ypraktikum.nomoredomains.work';
/*export const BASE_URL = 'http://localhost:3000';*/

const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
const getJson = (res) => {
  if (res.ok) {
    return res.json();
  }
  throw new Error({ status: res.status });
};

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ password, email }),
  }).then(getJson);
};

export const authorize = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ password, email }),
  }).then(getJson);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      ...HEADERS,
      Authorization: `Bearer ${token}`,
    },
  }).then(getJson);
};
