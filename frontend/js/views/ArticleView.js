define(function (require, exports, module) {
    "use strict";

    var ArticleView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.model, "change", this.render);
        },
        className: "article",
        template: _.template('<div class="headline"><%= title%><a target="_blank" href="<%= url%>">Open</a></div><div class="body"><%= body%></div>'),
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });

    module.exports = ArticleView;
});
