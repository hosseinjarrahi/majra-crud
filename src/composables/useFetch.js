function get(url, headers = {}) {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      ...headers,
    },
    body: JSON.stringify({
      a: 10,
      b: 20,
    }),
  };
  return fetch(url, options);
}

function post(url, data, headers = {}) {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      ...headers,
    },
    body: JSON.stringify(data),
  };
  return fetch(url, options);
}

export default function useFetch() {
  return {
    get,
    post,
  };
}
