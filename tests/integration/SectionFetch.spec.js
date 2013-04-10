(function () {
    "use strict";

    var expect = require("chai").expect;
    var requirejs = require("requirejs");
    requirejs.config({
        /*
        paths: {
            backbone: '../../../frontend/js_externals/backbone.dev',
            underscore: '../../../frontend/js_externals/underscore-min',
            jquery: '../../../node_modules/jquery/lib/node-jquery'
        },
        shim: {
            'underscore': {
                exports: '_'
            },
            'jquery': {
                exports: '$'
            },
            'backbone': {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            }
        }*/
    });
    var backbone = requirejs("backbone");
    backbone.$ = require("jquery");
    var ArticlePreviews = requirejs("../../../frontend/js/models/ArticlePreviews");

    describe("ArticlePreviews Collection", function () {
        it("is a constructor function", function () {
            expect(ArticlePreviews).to.be.a("function");
        });

        it("fetches correctly", function (callback) {
            ArticlePreviews.grabFromServer({
                success: function (articlePreviews) {
                    //var util = require("util");
                    //console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(expect(articlePreviews))));
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
