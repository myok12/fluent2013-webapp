define(function (require, exports, module) {
    "use strict";

    // renders an article preview on the section page.
    // registers for clicks
    var ArticlePreviewView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.model, "change", this.render);
        },
        className: "article-preview",
        events: {
            "click .headline": "articleClicked"
        },
        template: _.template('<div class="thumb <%if (!thumb) { %>hidden<% } %>"><%if (thumb) { %><img src="<%= thumb.url%>" height="<%= thumb.height%>" width="<%= thumb.width%>"><% } %></div><div class="headline"><%= title%></div><div class="summary"><%= summary%>'),
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
