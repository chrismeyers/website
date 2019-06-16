export default {
  methods: {
    showIEDialog() {
      this.$modal.show("dialog", {
        title: "Internet Explorer Detected",
        text: "For a better browsing experience, please visit this website " +
              "on a different browser, if possible.<br/><br/><i>Some functionality may " +
              "not work as expected on Internet Explorer.</i>",
        buttons: [
          {
            title: "Proceed",
            handler: () => {
              this.$modal.hide("dialog")
            }
          }
        ]
      })
    },
    showDialog(title, body) {
      this.$modal.show("dialog", {
        title: title,
        text: body.charAt(0).toUpperCase() + body.slice(1),
        buttons: [
          {
            title: "Proceed",
            handler: () => {
              this.$modal.hide("dialog")
            }
          }
        ]
      })
    },
    showConfirm(text, handler, title = null) {
      let options = {
        text: text,
        buttons: [
          {
            title: "No",
            default: true
          },
          {
            title: "Yes",
            handler: () => {
              this.$modal.hide("dialog")
              handler()
            }
          }
       ]
      }

      if(title) {
        options.title = title
      }

      this.$modal.show("dialog", options)
    }
  }
}