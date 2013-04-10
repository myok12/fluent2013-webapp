(function () {
    "use strict";

    var Article      = requireJs("../../../frontend/js/models/Article");
    var ArticleView  = requireJs("../../../frontend/js/views/ArticleView");


    var createArticleViewFromJson = function(articleJson, callback) {
        var articleId = articleJson.id;
        nock("http://localhost:8080")
            .get("/api/article/" + articleId)
            .reply(200, articleJson);

        var article = new Article({id: articleId});
        article.fetch({
            success: function (article2) {
                expect(article.attributes.id).to.equal(articleId);
                expect(article.attributes.title).to.be.ok;

                var articleView = new ArticleView({model: article});

                callback(null, articleView);
            },
            error: function () {
                callback(new Error("Should have successfully retreived the article", arguments));
            }
        });
    };

    describe("Article View", function () {

        it("is a constructor function", function () {
            expect(ArticleView).to.be.a("function");
        });

        it("renders content", function (callback) {
            var articleJson = require("../../../tests_utils/fixtures/article.json");
            var articleId = articleJson.id;

            createArticleViewFromJson(articleJson, function(err, articleView) {
                assert.ifError(err);

                articleView.render();

                var $el = articleView.$el;
                expect($el).to.be.ok;
                var link = $el.find("a");
                expect(link).to.be.ok;

                expect(link.attr('href')).to.equal(articleJson.url);

                callback();
            });
        });
    });
}());
