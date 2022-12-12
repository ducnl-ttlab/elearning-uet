import http from "./httpService";

const apiEndpoint = "http://localhost:5000";
const prefix = "/admin";
const adminEndpoint = "http://localhost:5000" + prefix;

async function login({ email, password }) {
  const config = { headers: { "Content-Type": "application/json" } };

  return http.post(
    adminEndpoint + "/login",
    {
      email,
      password,
    },
    config
  );
}

async function getCourseList() {
  return http.get(adminEndpoint + `/courses`);
}
async function getUserList() {
  return http.get(adminEndpoint + `/users`);
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

function getAdmin() {
  return http.get(`${apiEndpoint}/user/profile`);
}

function editCourse(courseId, body) {
  return http.put(`${adminEndpoint}/courses/${courseId}`, body);
}
function editUser(userId, body) {
  return http.put(`${adminEndpoint}/users/${userId}`, body);
}
function editRole(userId, body) {
  return http.put(`${adminEndpoint}/users/role/${userId}`, body);
}

export function getJwt() {
  return localStorage.getItem("token");
}

function setUpAuth() {
  http.setJwt(getJwt());
}
setUpAuth();

async function setInstructor(userId) {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  return await http.put(apiEndpoint + `/setInstructor/${userId}`, config);
}

async function deleteUser(userId) {
  return await http.delete(apiEndpoint + `/delete/${userId}`);
}

async function deleteCourse(courseId) {
  return await http.delete(apiEndpoint + `/deleteCourse/${courseId}`);
}

async function getAll() {
  return await http.get(apiEndpoint + `/statistic`);
}

export default {
  login,
  logout,
  getUserList,
  getCourseList,
  getJwt,
  getAdmin,
  setInstructor,
  deleteCourse,
  deleteUser,
  editCourse,
  getAll,
  setUpAuth,
  editUser,
  editRole,
};
