"use strict"

express  = require("express")
http     = require("http")
async    = require("async")
optimist = require("optimist")

app = express()

argv = optimist
    .alias( "h", "help" )
    .default
        port: 8080
    .argv

if argv.help or argv.h
    console.log """
                .-.   .-..----..----..-..-.   .----.   .-. . .-..----..----.
                |  `.'  /  {}  \\ {}  } || |   | {_     | |/ \\| || {_  | {}  }
                | |\\ /| \\      / {}  } || `--.| {__    |  .'.  || {__ | {}  }
                `-' ` `-'`----'`----'`-'`----'`----'   `-'   `-'`----'`----'

        Usage:  #{argv["$0"]} [--port <port>

        --port <port> : default [3000]

        Shortcuts:
            npm run-script start-api
    """
    process.exit()

app.set "port", argv.port
app.configure ->
    app.enable 'jsonp callback'

app.use express.logger()
app.use express.bodyParser()
app.use app.router

# Location of the static files that are the UI of the app
app.use express.static("../frontend")
app.get "/", (req, res)->
    res.redirect 303, "reader.html"
#rerouting???

app.use express.errorHandler()


# App setup
async.series [
    (callback) =>
        # registers all sections of the site
        routes = require("./routes")
        #router = new Router({express, app})
        routes app
        callback()
], =>

    # sets up the server
    http.createServer(app).listen app.get("port"), ->
        console.log "Server listening on port #{app.get("port")}"
