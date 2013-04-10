define(function (require, exports, module) {
    "use strict";

    var BackView = Backbone.View.extend({
        template: _.template('<img class="button-back">'),
        events: {
            "click img": "backClicked"
        },
        backClicked: function (evt) {
            //fires a global event for back button
            Backbone.Events.trigger("backClicked");
        },
        getImg: function () {
            if (!this.img) {
                this.img = this.$el.find('img');
            }
            return this.img;
        },
        hide: function () {
            this.getImg().hide();
        },
        show: function () {
            this.getImg().show();
        },
        render: function () {
            this.$el.html(this.template({}));
            return this;
        }
    });

    module.exports = BackView;
});
