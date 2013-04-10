define(function (require, exports, module) {
    "use strict";

    var ArticlePreviews  = require("./models/ArticlePreviews");
    var SectionView      = require("./views/SectionView");
    var Article          = require("./models/Article");
    var ArticleView      = require("./views/ArticleView");
    var BackView         = require("./views/BackView");

    var views = [];
    var addView = function (view) {
        views.push(view);
    };
    var removeViews = function () {
        var i;
        for (i = 0; i < views.length; i += 1) {
            views[i].remove();
        }
        views = [];
    };

    var $backContainer = $.find(".left-buttons");
    var backView = new BackView({el: $backContainer[0]});
    backView.render();
    backView.hide();

    var backToStart = function () {
        exports.start();
    };
    var backDisabled = function () { };
    var backFn = backDisabled;
    Backbone.Events.on("backClicked", function() {
        backFn();
    });

    var $output = $(".screen-center");
    exports.start = function () {
        var backFn = backDisabled;
        removeViews();
        ArticlePreviews.grabFromServer({
            success: function (articlePreviews) {
                backFn = backDisabled;
                backView.hide();
                // grabbed the section, can render the views

                var sectionView = new SectionView({
                    collection: articlePreviews,
                    el: $("<div></div>").appendTo($output)
                }).render();
                addView(sectionView);
            },
            error: function () {
                // failed to grab the section
                console.log("error", arguments);
            }
        });
    };

    exports.openArticleById = function (articleId) {
        if (!articleId) { throw new Error("articleId not provided"); }
        // has an article preview, will now fetch the full article
        removeViews();
        Article.grabById(articleId, {
            success: function (article) {
                backView.show();
                backFn = backToStart;
                // grabbed the section, can render the views
                var articleView = new ArticleView({
                    model: article,
                    el: $("<div></div>").appendTo($output)
                }).render();
                addView(articleView);
            },
            error: function () {
                // failed to grab the section
                console.log("error", arguments);
            }
        });
    };
});
