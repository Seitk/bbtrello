module.exports = {
  bbtrello: {
    port: 9457
  },
  Trello: {
    APP_KEY: "<Your APP Key>", // DO enter the key you get from https://trello.com/app-key
    APP_TOKEN: "<Your APP Token>", // DO enter the token you get from /get_token   . WARNING: It's not your App Secret.

    // This is for checking, DO NOT change
    isAppKeySet: function() {
      return this.APP_KEY === "<Your APP Key>"; // This is for checking, DO NOT change
    },
    isAppTokenSet: function() {
      return this.APP_TOKEN === "<Your APP Token>" // This is for checking, DO NOT change
    },
    isReady: function() {
      return this.isAppKeySet() && this.isTrelloReady();
    }
  }
}