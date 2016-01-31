var express = require('express');
var Config = require('./config.js');
var colors = require('colors');
var sprintf = require('sprintf');
var _ = require('underscore');
var Trello = require("node-trello");

if (Config.Trello.isAppKeySet()) {
  console.log("Please configure your app key in config.js (https://trello.com/app-key)".underline.red);
  process.exit();
}

if (Config.Trello.isAppTokenSet()) {
  console.log("Please configure your app token by goto /get_token".underline.red);
  console.log("\nDon't forget to restart your node.js app afterward");
}

var app = express();
app.use(require('body-parser').json());
app.use(express.static(__dirname + '/public'))
if (Config.Trello.isReady) {
  var t = new Trello(Config.Trello.APP_KEY, Config.Trello.APP_TOKEN);
}

app.get('/', function(req, res) {
  res.send("bbtrello is up and running");
});

app.get('/get_token', function(req, res) {
  console.log(Config.Trello.APP_KEY);
  res.redirect(sprintf("https://trello.com/1/connect?key=%s&name=MyApp&response_type=token&expiration=never&scope=read,write", Config.Trello.APP_KEY));
});

app.post('/', function(req, res) {
  var params = req.body.push;
  if (params && params.changes.length > 0) {
    for (var i = 0; i < params.changes.length; i++) {
      var change = params.changes[i];
      // console.log(change);
      if (change.new !== null) {
        var message = change.new.target.message.replace(/\n$/, ""); // Remvoe tailing newline
        var trelloCardIds = _.uniq(message.match(/\[[A-Za-z0-9]+\]/g));
        if (trelloCardIds.length > 0) {
          var author = change.new.target.author.user.display_name;
          var branch = change.new.name;          
          var url = change.new.target.links.html.href;
          var msg = sprintf("**%s** added a commit to branch **%s**\n\"%s\"\n%s", author, branch, message, url);

          for (var i = 0; i < trelloCardIds.length; i++) {
            var cardId = trelloCardIds[i].replace(/\[|\]/g, "");
            sendTrelloComment(cardId, msg);
          };
        }
      }
    };
  }
  res.send("\nDone");
});

function sendTrelloComment(cardId, text) {
  t.get(sprintf("/1/cards/%s", cardId), function(err, data) {
    if (!err) {
      t.post(sprintf("/1/cards/%s/actions/comments", cardId), { text: text }, function(commentErr, data) {
        if (commentErr) {
          console.log(sprintf("Error occurred when sending comment to card %s", cardId));
        }
      });
    }
  });
}

var port = Config.bbtrello.port;
app.listen(port, function () {
  console.log('bbtrello listening on port ' + port);
});