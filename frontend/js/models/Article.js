define(function (require, exports, module) {
    "use strict";

    var Article = Backbone.Model.extend({
        urlRoot: 'http://localhost:8080/api/article'
    }, {
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
