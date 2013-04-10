(function () {
    "use strict";

    var Article = requireJs("../../../frontend/js/models/Article");

    describe("Article Model", function () {
        it("is a constructor function", function () {
            expect(Article).to.be.a("function");
        });

        it("fetches correctly", function (callback) {
            var articleId = 1234;

            nock("http://localhost:8080")
                .get("/api/article/" + articleId)
                .reply(200, require("../../../tests_utils/fixtures/article.json"));

            var article = new Article({id: articleId});
            article.fetch({
                success: function (article2) {
                    expect(article).to.equal(article2);

                    expect(article).to.be.ok;
                    var articleAttributes = article.attributes;
                    expect(articleAttributes).to.be.ok;
                    expect(articleAttributes.id).to.be.ok;
                    expect(articleAttributes.title).to.be.ok;
                    expect(articleAttributes.url).to.be.ok;

                    callback();
                },
                error: function () {
                    console.log(arguments);
                    callback(new Error("Should have successfully retreived the section"));
                }
            });
        });
    });
}());
