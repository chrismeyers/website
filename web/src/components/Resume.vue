<template>
  <div class="content">
    <div class="section-header section-header-size">Résumé</div>

    <div class="content-text">
      <h2 class="top">Experience</h2>
      <div v-for="job in experience" :key="job.id">
        <div class="left-column company">{{ job.firstLine[0] }}</div>
        <div class="right-column location">{{ job.firstLine[1] }}</div>

        <div v-for="(position, i) in job.secondLine" :key="position.id">
          <div class="left-column sub-left-column job-title">{{ job.secondLine[i][0] }}</div>
          <div class="right-column tenure" v-html="job.secondLine[i][1]"></div>
          <div class="remove-bullets" v-for="entry in job.info[i]" :key="entry.id">
            <ul class="more-info">
              <div class="more-info">{{ entry }}</div>
            </ul>
          </div>
        </div>
      </div>

      <br /> <hr>

      <h2>Education</h2>
      <div v-for="school in education" :key="school.id">
        <div class="left-column school">{{ school.firstLine[0] }}</div>
        <div class="right-column location">{{ school.firstLine[1] }}</div>

        <div v-for="degree in school.secondLine" :key="degree.id">
          <div class="left-column sub-left-column degree">{{ degree[0] }}</div>
          <div class="right-column tenure" v-html="degree[1]"></div>
        </div>
      </div>

      <br /> <hr>

      <h2>Technical Skills</h2>
      <ul>
        <li v-for="skill in skills" :key="skill.id">{{ skill }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Resume',
  data() {
    return {
      experience: null,
      education: null,
      skills: null
    }
  },
  mounted() {
    axios.get(`http://localhost:8888/resume`)
    .then(response => {
      var resume = response.data
      this.experience = resume['experience']
      this.education = resume['education']
      this.skills = resume['skills']
    })
  }
}
</script>

<style scoped>
.remove-bullets {
  list-style-type: none;
}

@media screen and (min-width: 860px) {
  ul {
    overflow: hidden;
  }
  ul.more-info {
    padding-top: 10px;
  }

  .left-column {
    width: 70%;
    float: left;
  }

  .sub-left-column {
    list-style-type: none;
  }

  .right-column {
    float: right;
    width: 30%;
    text-align: right;
    list-style-type: none;
  }

  .company, .school, .location {
    font-weight: bold;
  }

  .degree, .job-title, .tenure {
    font-style: italic;
  }

  .same-company-spacing {
    margin-top: 20px;
  }
}

@media screen and (max-width: 806px) {
  .company, .school {
    font-weight: bold;
  }

  .location, .degree {
    font-weight: normal;
  }

  .location, .degree, .job-title, .tenure {
    list-style-type: none;
  }
  .location:before, .degree:before, .job-title:before, .tenure:before {
    content: "- ";
  }
}
</style>
