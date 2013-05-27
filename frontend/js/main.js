define(function (require, exports, module) {
    "use strict";

    var ArticlePreviews  = require("./models/ArticlePreviews");
    var SectionView      = require("./views/SectionView");
    var Article          = require("./models/Article");
    var ArticleView      = require("./views/ArticleView");
    var BackView         = require("./views/BackView");

    // makes sure we are only displaying a single page-worth of views at any given time
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

    // adds the back buttons and hides it for the section page
    var $backContainer = $.find(".left-buttons");
    var backView = new BackView();
    backView.render();
    backView.$el.appendTo($backContainer[0]);
    backView.hide();

    // the two options for when clicking on back - 
    // enabled (from article page) and disabled (from section page)
    var backToStart = function () {
        exports.start();
    };
    var backDisabled = function () { };
    var backFn = backDisabled;
    Backbone.Events.on("backClicked", function() {
        backFn();
    });

    var $output = $(".screen-center");
    // the section page
    exports.start = function () {
        backFn = backDisabled;
        backView.hide();

        removeViews();

        // grabs the section content
        ArticlePreviews.grabFromServer({
            success: function (articlePreviews) {
                // grabbed the section, can render the views
                var sectionView = new SectionView({
                    collection: articlePreviews
                }).render();
                // renders it all off-screen and the adds it in a single shot
                sectionView.$el.appendTo($output);
                addView(sectionView);
            },
            error: function () {
                // failed to grab the section
                console.log("error", arguments);
            }
        });
    };

    // the article page
    exports.openArticleById = function (articleId) {
        if (!articleId) { throw new Error("articleId not provided"); }

        backFn = backToStart;
        backView.show();

        removeViews();

        // has an article preview, will now fetch the full article
        Article.grabById(articleId, {
            success: function (article) {
                // grabbed the section, can render the views
                var articleView = new ArticleView({
                    model: article
                }).render();
                // renders it all off-screen and the adds it in a single shot
                articleView.$el.appendTo($output);
                addView(articleView);
            },
            error: function () {
                // failed to grab the section
                console.log("error", arguments);
            }
        });
    };
});
