const BASE_URL = "https://student-json-api.lidemy.me";

export const getPosts = (perPage, page) => {
  let url = BASE_URL + "/posts?";
  let query = {
    _sort: "createdAt",
    _order: "desc",
    _limit: perPage,
    _page: page,
  };
  let queryString = [];
  for (let key in query) {
    queryString.push(`${key}=${encodeURIComponent(query[key])}`);
  }
  url += queryString.join("&");
  return fetch(url);
};

export const getMyPosts = (userId, perPage, page) => {
  let url = BASE_URL + "/posts?";
  let query = {
    _sort: "createdAt",
    userId,
    _order: "desc",
    _limit: perPage,
    _page: page,
  };
  let queryString = [];
  for (let key in query) {
    queryString.push(`${key}=${encodeURIComponent(query[key])}`);
  }
  url += queryString.join("&");
  return fetch(url);
};

export const getOnePost = (id) => {
  return fetch(`${BASE_URL}/posts?id=${id}`).then((res) => res.json());
};

export const register = (nickname, username, password) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const getMe = () => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const publishPost = (title, body) => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  }).then((res) => res.json());
};

export const editPost = (id, title, body) => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
      createdAt: Date.now(),
    }),
  }).then((res) => res.json());
};
