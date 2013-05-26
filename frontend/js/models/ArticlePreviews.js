define(function (require, exports, module) {
    "use strict";

    var ArticlePreview = require("./ArticlePreview");

    var ArticlePreviews = Backbone.Collection.extend({
        model: ArticlePreview,
        url: 'http://localhost:8000/api/section'
    }, {
        grabFromServer: function (options) {
            options = options || {};
            var articlePreviews = new ArticlePreviews();
            articlePreviews.fetch({
                success: function () {
                    // grabbed the list of article previews from the server
                    if (options.success) {
                        return options.success(articlePreviews);
                    }
                },
                error: function () {
                    // failed to grab the section
                    if (options.error) {
                        return options.error(arguments);
                    }
                }
            });
            return articlePreviews;
        }
    });

    module.exports = ArticlePreviews;
});
