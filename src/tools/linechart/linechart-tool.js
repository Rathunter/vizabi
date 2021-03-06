/*!
 * VIZABI LINECHART
 */

(function () {

  "use strict";

  var root = this;
  var Vizabi = root.Vizabi;
  var utils = Vizabi.utils;

  //warn client if d3 is not defined
  if (!Vizabi._require('d3')) return;


  //LINE CHART TOOL
  Vizabi.Tool.extend('LineChart', {
    /**
     * Initialized the tool
     * @param config tool configurations, such as placeholder div
     * @param options tool options, such as state, data, etc
     */
    init: function (config, options) {

      this.name = 'linechart';

      this.components = [{
        component: 'gapminder-linechart',
        placeholder: '.vzb-tool-viz',
        model: ["state.time", "state.entities", "state.marker", "language"] //pass models to component
      }, {
        component: 'gapminder-timeslider',
        placeholder: '.vzb-tool-timeslider',
        model: ["state.time"],
        ui: {show_value_when_drag_play: false, axis_aligned: true}
      }, {
        component: 'gapminder-buttonlist',
        placeholder: '.vzb-tool-buttonlist',
        model: ['state', 'ui', 'language']
      }];

      this._super(config, options);
    }

  });

}).call(this);
