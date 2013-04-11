"use strict"
async    = require("async")
assert   = require("assert")

loadArticle = (articleId, cb) ->
    articleJson = null
    try
        articleJson = require "./data/article#{articleId}.json"
    catch e
        cb(new Error "ArticleID not found")
    cb null, articleJson



module.exports = (app) ->

    app.get '/api/section', (req, res) ->
        section = require "./data/section.json"
        assert section?.articleIds?, "No articles listed in section"
        # builds all loading functions for the articles
        loads = []
        for articleId in section.articleIds
            do (articleId) ->
                loads.push (callback) =>
                    loadArticle articleId, callback

        selectThumb = (article) ->
            if ! article?.relatedAssets? then return null
            for asset in article.relatedAssets
                if asset.crops.articleInline then return asset.crops.articleInline
            return null

        # scales down from a full article to a smaller preview
        fromFullArticleToArticlePreviewMapper = (article) ->
            articlePreview = {}
            articlePreview.id = article.id or throw new Error "id missing in article"
            articlePreview.title = article.title or throw new Error "title missing in article"
            articlePreview.thumb = selectThumb(article) or ""

            return articlePreview

        async.series loads, (err, articles) =>
            articlePreviews = articles.map(fromFullArticleToArticlePreviewMapper)
            res.json articlePreviews

    app.get '/api/article/:articleId', (req, res, next) ->
        articleId = req.route?.params?.articleId
        if !articleId? or Number(articleId) != parseInt(articleId, 10) # Morss
            return next(new Error "ArticleID not properly provided")

        loadArticle articleId, (err, article) ->
            if err?
                return next(new Error "ArticleID not found")
            res.json article
