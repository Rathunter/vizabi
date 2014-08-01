define([
    'base/class',
    'managers/events',
    'managers/data'
], function(Class, Events, DataManager) {

    var model = Class.extend({

        init: function(datapath) {
            datapath = datapath ? datapath.path : "";
            this.attributes = {};
            this.dataManager = new DataManager(datapath);
        },

        get: function(attr) {
            return (attr) ? this.attributes[attr] : this.attributes;
        },

        //set an attribute for the model, or an entire object
        set: function(attr, value, silent) {
            if (typeof attr !== 'object') {
                var attrs = {};
                attrs[attr] = value;
                attr = attrs;
            } else {
                silent = value;
            }

            for (var att in attr) {
                this.attributes[att] = attr[att];
            }

            //silent mode is used to avoid event propagation
            if (!silent) Events.trigger("change");
        },

        bind: function(name, func) {
            Events.bind(name, func);
        },

        trigger: function(name) {
            Events.trigger(name);
        },

        load: function(options) {
            var _this = this,
                defer = $.Deferred(),
                promise = this.dataManager.load(options);

            //when request is completed, set it
            $.when(promise).done(function() {
                _this.set(_this.dataManager.get());
                defer.resolve();
            });

            return defer;
        }
    });

    return model;

});