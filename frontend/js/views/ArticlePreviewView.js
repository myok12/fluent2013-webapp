define(function (require, exports, module) {
    "use strict";

    var ArticlePreviewView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.model, "change", this.render);
        },
        events: {
            "click .headline": "articleClicked"
        },
        template: _.template('<div class="headline"><%= title%></div>'),
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        articleClicked: function (evt) {
            var articleId = this.model.id;
            if (!articleId) { throw new Error("Cannot find model id for a clicked article"); }
            require("../main").openArticleById(articleId);
        }
    });

    module.exports = ArticlePreviewView;
});
