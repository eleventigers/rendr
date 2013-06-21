/*global rendr*/

/**
 * This is the app instance that is shared between client and server.
 * The client also subclasses it for client-specific stuff.
 */

var Backbone, ClientRouter, Fetcher;

require('./globals');
Backbone = require('backbone');
Fetcher = require('./fetcher');
ViewStore = require('./store/view_store');

if (!global.isServer) {
  ClientRouter = require(rendr.entryPath + "/app/router");
}

function noop() {}

module.exports = Backbone.Model.extend({

  defaults: {
    loading: false
  },

  /**
   * @shared
   */
  initialize: function() {
    this.fetcher = new Fetcher({
      app: this
    });
    this.viewStore = new ViewStore({
      app: this
    });
    if (!global.isServer) {
      new ClientRouter({
        app: this
      });
    }
    this.postInitialize();
  },

  postInitialize: noop,

  /**
   * @shared
   */
  fetch: function() {
    this.fetcher.fetch.apply(this.fetcher, arguments);
  },

  /**
   * @client
   */
  bootstrapData: function(modelMap) {
    this.fetcher.bootstrapData(modelMap);
  },

  /**
   * @client
   */
  start: function() {
    this.router.start();
  }
});
