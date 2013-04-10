define(function (require, exports, module) {
    "use strict";

    var ArticlePreviewView = require("./ArticlePreviewView");

    var SectionView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.collection, "change", this.render);
        },
        events: {
            "click .icon": "open"
        },
        template: _.template('<div>Section</div><div class="article-previews"></div>'),
        render: function () {
            this.$el.html(this.template({}));

            var $articles = this.$el.find('.article-previews');

            var i;
            for (i = 0; i < this.collection.length; i += 1) {
                var $article = $('<div class="article-preview"></div>').appendTo($articles);
                var articlePreviewView = new ArticlePreviewView({
                    model: this.collection.at(i),
                    el: $article
                }).render();

            }
            return this;
        }
    });

    module.exports = SectionView;
});
