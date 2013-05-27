define(function (require, exports, module) {
    "use strict";

    // A model that wraps an article
    var Article = Backbone.Model.extend({
        // defines how to grab an article from the server
        urlRoot: 'http://localhost:8000/api/article' // + '/<articleId>'
    }, {
        // a "static" method to construct, an article for a given article id, by fetching it
        grabById: function (articleId, options) {
            if (!articleId) { throw new Error("articleId not provided"); }
            options = options || {};
            var article = new Article({id: articleId});
            article.fetch({
                success: function () {
                    // grabbed the section from the server
                    if (options.success) {
                        return options.success(article);
                    }
                },
                error: function () {
                    // failed to grab the section
                    if (options.error) {
                        return options.error(arguments);
                    }
                }
            });
            return article;
        }
    });

    module.exports = Article;
});
