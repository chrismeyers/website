import axios from "axios"

export default {
  // GET Methods
  get() {
    return axios
      .get("/public/resume")
      .then(response => {
        return response
      })
      .catch(err => {
        return err.response
      })
  },
  getInfoForAboutPage() {
    return axios
      .get("/public/resume")
      .then(response => {
        return {
          "langMap": getLanguageExperience(response.data.skills),
          "currentJob": getCurrentJob(response.data.experience[0])
        }
      })
      .catch(err => {
        return err.response
      })
  }
}

function getCurrentJob(currentJob) {
  return {
    "company": currentJob.firstLine[0],
    "url": currentJob.url,
    "title": currentJob.secondLine[0][0].split(",")[0],
    "dates": currentJob.secondLine[0][1].split("&ndash;").map(d => d.trim())
  }
}

function getLanguageExperience(skills) {
  let langMap = {}

  for(const skill of skills) {
    if(Object.keys(langMap).length == 2) {
      break
    }
    else if(skill.mainItem.includes("Desktop and CLI")) {
      langMap["desktop"] = skill.subItems[0]
    }
    else if(skill.mainItem.includes("Websites, Web Apps, and APIs")) {
      langMap["web"] = skill.subItems[0]
    }
  }

  return langMap
}
