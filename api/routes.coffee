"use strict"

module.exports = (app) ->

    app.get '/api/section', (req, res) ->
        sectionJson = require "./data/section.json"
        res.json sectionJson

    app.get '/api/article/:articleId', (req, res, next) ->
        articleId = req.route?.params?.articleId
        if !articleId? or Number(articleId) != parseInt(articleId, 10) # Morss
            return next(new Error "ArticleID not properly provided")

        articleJson = null
        try
            articleJson = require "./data/article#{articleId}.json"
        catch e
            return next(new Error "ArticleID not found")
        res.json articleJson
