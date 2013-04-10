define(function (require, exports, module) {
    "use strict";

    var ArticleView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.model, "change", this.render);
        },
        template: _.template('<div class="headline"><a href="<%= url%>"><%= title%></a></div>'),
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });

    module.exports = ArticleView;
});
