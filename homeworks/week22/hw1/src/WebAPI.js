const BASE_URL = "https://student-json-api.lidemy.me";

export const getPosts = (perPage, page) => {
  return fetch(
    `${BASE_URL}/posts?_sort=createdAt${perPage && `&_limit=${perPage}`}${
      page && `&_page=${page}`
    }
    }&_order=desc`
  ).then((res) => res.json());
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

export const editPost = (title, body) => {
  const token = localStorage.getItem("token");
  return fetch(`${BASE_URL}/posts`, {
    method: "PUT",
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

export const getMyPosts = (userId, perPage, page) => {
  return fetch(
    `${BASE_URL}/posts?userId=${userId}&_sort=createdAt${
      perPage && `&_limit=${perPage}`
    }${page && `&_page=${page}`}&_order=desc`
  ).then((res) => res.json());
};
