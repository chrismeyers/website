<template>
  <div class="content">
    <div class="section-header section-header-size">About</div>

    <div class="content-text">
      <span>My name is Chris Meyers and I am a Software Engineer and technology enthusiast. Here's a quick list of things you should know about me:</span>

      <ul>
        <li>I studied Computer Science at <a class="fancytxt" href="http://www.rowan.edu/" target="_blank">Rowan University</a> in Glassboro, NJ and earned a Bachelor of Science in Computer Science.</li>
        <li>Currently, I am employed as a Software Engineer at <a class="fancytxt" href="http://asrcfederal.com/afms" target="_blank">ASRC Federal Mission Solutions</a>.</li>
        <li>Some of my professional interests include:
          <ul>
            <li>Software Development, Web Development, Computer Networking</li>
          </ul>
        </li>
        <li>My hobbies include:
          <ul>
              <li>Photography, reading, <a href="#builds" class="fancytxt">building custom computers</a>, playing video games</li>
          </ul>
        </li>
        <li>I am the owner of this <a data-fancybox="gallery_clark" href="images/v6/clark/DSC_1564-6.jpg" title="Clark the Corgi" class="fancytxt no-outline">majestic beast</a>.</li>
      </ul>

      <p>Over the years, I've gained experience with the following programming languages and frameworks:</p>

      <ul>
        <li>Desktop and CLI applications:
          <ul>
            <li>C++, Python, Java, C#</li>
          </ul>
        </li>
        <li>Websites, Web Apps, and APIs:
          <ul>
            <li>LAMP stack (Linux, Apache, MySQL, PHP), Flask (Python web framework), JavaScript (jQuery, AngularJS, Node.js, React)</li>
          </ul>
        </li>
      </ul>

      <span>I have spent my entire professional programming career striving to write clean, modular, and maintainable code. I am always up for the challenge of
      learning new languages and frameworks. If a language or framework that I'm unfamiliar with is the best choice for a project, I have no hesitation in
      breaking away from my comfort zones to explore new options. My primary goal is to create innovative and usable applications that solve problems.</span>

      <p><a href="#contact" class="fancytxt">Send me a message</a> if you have any questions, comments, or would like to work together on a project.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.section-header {
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.content {
  -webkit-margin-bottom-collapse: separate; /* Fixes margin-bottom for non-chrome browsers */
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
}

.content-text {
  padding: 10px 5px 10px 5px;
}

.dt-mod {
  margin-top: 15px;
}

.dt-links {
  margin-bottom: 5px;
}

.first-header {
  margin-top: 0px;
}

.content {
  -webkit-flex: 1;
  flex: 1;
}

.content-text {
  padding: 10px 15px;
  max-width: 1595px; /* Max width = 1920, adjusted for margins and nav. Does not account for scroll bars. */
  margin: 0 auto; /* Centers content if width is greater than 1920px. */
}

.section-header-size {
  height: 90px;
  line-height: 90px;
  font-size: 40px;
  text-align: center;
}
</style>
