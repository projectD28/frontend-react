import axios from "configs/axios";

export default {
  //detail courses
  details: (id) => axios.get(`/courses/${id}`).then((res) => res.data),
  ///my-courses
  join: (id) => axios.post("/my-courses", { course_id: id }),
  mine: () => axios.get("/my-courses"),
};
