define(function (require, exports, module) {
    "use strict";

    // renders a full-screen article
    var ArticleView = Backbone.View.extend({
        initialize: function () {
            this.listenTo(this.model, "change", this.render);
        },
        className: "article",
        template: _.template('\
                             <% if (typeof(relatedAssets)!="undefined" && relatedAssets[0] &&    \
                             relatedAssets[0].crops && relatedAssets[0].crops.jumbo) { %>           \
                                 <div class="image">                                                \
                                      <img src="<%= relatedAssets[0].crops.jumbo.url %>" >          \
                                 </div>                                                             \
                             <% } %>                                                                \
                             <div class="headline">                                                 \
                                 <%= title %>                                                       \
                                 <a target="_blank" href="<%= url %>">Open In a New Window</a>      \
                             </div>                                                                 \
                             <div class="body">                                                     \
                                <%= body %>                                                         \
                             </div>                                                                 \
        '),
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });

    module.exports = ArticleView;
});
