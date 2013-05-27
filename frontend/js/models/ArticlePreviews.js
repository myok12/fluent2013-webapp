define(function (require, exports, module) {
    "use strict";

    var ArticlePreview = require("./ArticlePreview");

    // a collection of ArticlePreview objects
    // contains all elements for generating a section page
    var ArticlePreviews = Backbone.Collection.extend({
        model: ArticlePreview,
        // will grab the collection from the api server
        url: 'http://localhost:8000/api/section'
    }, {
        // a "static" method to construct the object, by fetching it from the api
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
