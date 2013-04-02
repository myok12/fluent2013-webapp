(function () {
    "use strict";

    var expect = require("chai").expect;
    var requirejs = require("requirejs");
    var main = requirejs("../../../frontend/js/main");

    describe("main", function () {
        it("exports fn correctly", function () {
            expect(main.fn).to.be.a("function");
        });
    });
}());
