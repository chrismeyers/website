import axios from "axios"

export default {
  // GET Methods
  getResume() {
    return axios
      .get("/resume")
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      })
  }
}
