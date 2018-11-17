import axios from "axios"

export default {
  // GET Methods
  getResume() {
    return axios
      .get("/public/resume")
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      })
  }
}
