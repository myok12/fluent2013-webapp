(function () {
    "use strict";

    var ArticlePreviews = requireJs("../../../frontend/js/models/ArticlePreviews");

    describe("ArticlePreviews Collection", function () {
        it("is a constructor function", function () {
            expect(ArticlePreviews).to.be.a("function");
        });

        it("fetches correctly", function (callback) {
            nock("http://localhost:8080")
                .get("/api/section")
                .reply(200, require("../../../tests_utils/fixtures/section.json"));

            ArticlePreviews.grabFromServer({
                success: function (articlePreviews) {
                    expect(articlePreviews).to.be.ok;

                    expect(articlePreviews.length).to.be.greaterThan(3);

                    var articlePreview = articlePreviews.at(0);
                    expect(articlePreview).to.be.ok;
                    var articlePreviewAttributes = articlePreview.attributes;
                    expect(articlePreviewAttributes).to.be.ok;
                    expect(articlePreviewAttributes.id).to.be.ok;
                    expect(articlePreviewAttributes.title).to.be.ok;

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
