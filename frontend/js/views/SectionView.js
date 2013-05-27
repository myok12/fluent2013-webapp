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
        template: _.template('<div class="section-title"></div><div class="article-previews"></div>'),
        render: function () {
            this.$el.html(this.template({}));

            var $articles = this.$el.find('.article-previews');

            // renders all existing article previews in place
            var i;
            for (i = 0; i < this.collection.length; i += 1) {
                var articlePreviewView = new ArticlePreviewView({
                    model: this.collection.at(i),
                }).render();
                $articles.append(articlePreviewView.el);

            }
            return this;
        }
    });

    module.exports = SectionView;
});
