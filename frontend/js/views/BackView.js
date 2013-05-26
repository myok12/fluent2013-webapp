define(function (require, exports, module) {
    "use strict";

    var BackView = Backbone.View.extend({
        template: _.template('<img class="button-back" src="images/back.png">'),
        events: {
            "click img": "backClicked"
        },
        backClicked: function (evt) {
            //fires a global event for back button
            Backbone.Events.trigger("backClicked");
        },
        hide: function () {
            this.$el.hide();
        },
        show: function () {
            this.$el.show();
        },
        render: function () {
            this.$el.html(this.template({}));
            return this;
        }
    });

    module.exports = BackView;
});
