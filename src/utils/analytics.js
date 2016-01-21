/**
 * Analytics Util
 * @namespace analytics
 */

/**
 * HOW TO: Implement Event Tracking
 * Opt 1: Call customTrackEvent(analyticsData)
 * see googleTrackEvent function below for more info
 * example:
 * var analyticsData = {
 *        'category':'your category',
 *        'action'  :'click',
 *        'optLabel':'',
 *        'optValue': null,
 *        'optNoninteract': false
 * };
 * analytics.customTrackEvent(analyticsData);
 */

/**
 * HOW TO: Implement Event Tracking
 * Opt 2: Add data-track to click DOM element
 * see googleTrackEvent function below for more info
 * example:
 * data-track="{
 *  'category':'your category',
 *  'action'  :'click',
 *  'optlabel':'',
 *  'optvalue': null,
 *  'optnoninteract': false
 * }"
 */

// Import Helpers
import helpers from '../utils/helpers';

// Set global namespace
var analytics = analytics || {};
analytics = function() {

    var _gaq = _gaq || [];

    /**
     * Google Track Event
     * @type {Function}
     * @public
     * @param params {Object} {
     *  category: String required
     *  action: String required
     *  optLabel: String optional
     *  optValue: Int optional
     *  optNoninteract: Boolean optional (true = event not included in bounce rate calc)
     * }
     */
    function googleTrackEvent(params) {
        // Determine tracking title and prepend template name
        var category = params.hasOwnProperty('category') ? params.category : '',
            action = params.hasOwnProperty('action') ? params.action : '',
            optLabel = params.hasOwnProperty('optlabel') ? params.optlabel : '',
            optValue = params.hasOwnProperty('optvalue') ? params.optvalue : null,
            optNoninteract = params.hasOwnProperty('optnoninteract') ? params.optnoninteract : false;


        console.log('<=====params', params);

        // push google click track event
        _gaq.push(['_trackEvent', category, action, optLabel, optValue, optNoninteract]);
    }

    /**
     * Google Pageview Tracking
     * @type {Function}
     * @private
     * @param params {Object} {
     *  path: String required (ex. '/home' must start with forward slash)
     * }
     */
    function googlePageview(params) {
        var pageURL = params.hasOwnProperty('path') ? params.path : helpers.getURLPath();

        _gaq.push(['_trackPageview', pageURL]);
    }

    /**
     * bind Page Load event
     * @type {Function}
     * @private
     */
    function bindPageLoad() {
        var data = {};

        // set page load url
        data.path = helpers.getURLPath();

        console.log('<------------google track page data', data);
        // call google pageview tracking
        googlePageview(data);
    }

    /**
     * Bind Document Click
     * Binds click event to the document, and registers events for elements with a data-track {Object} attribute
     * example:
     * data-track="{
     *  'category':'your category',
     *  'action'  :'click',
     *  'optlabel':'',
     *  'optvalue': null,
     *  'optnoninteract': false
     * }"
     * @type {Function}
     * @private
     */
    function bindDocumentClick() {
        $(document).on('click', '*[data-track]', function(event) {
            var target = $(event.target);
            var track = $(this);
            //var section = $(target).closest('[data-section]');

            // get the core tracking configuration
            var data = eval('(' + track.attr('data-track') + ')');

            // call google event tracking
            googleTrackEvent(data);
        });
    }

    /**
     * Custom Tracking Event triggers google track events
     * @type {Function}
     * @public
     * @property data
     * @type {Object} {
     *  category: String required
     *  action: String required
     *  optLabel: String optional
     *  optValue: Int optional
     *  optNoninteract: Boolean optional (true = event not included in bounce rate calc)
     * }
     */
    function customTrackEvent(data) {
        googleTrackEvent(data);
    }

    /**
     * Init Analytics
     * @type {Function}
     * @public
     */
    function init() {
        //console.log('<==========Google Analytics Init');
        bindPageLoad();
        bindDocumentClick();
    }

    return {
        init: init,
        customTrackEvent: customTrackEvent
    };
}();

export default analytics;
