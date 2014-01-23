/**
 * Tumblr specific javascript
 */

(function() {
  "use strict";

  /*
   * Author name replacement - needed because tumblr doesn't have full names
   */
  var tumblrAuthors = {
    thatsinthebook: "Toby Hunt",
    shapeshed: "George Ornbo",
    elpabl0: "Paul Evans",
    sebbo: "Sebastian Nash",
    abutcher: "Alex Butcher",
    tutaktran: "Tak Tran",
    josephjeganathan: "Joseph Jeganathan",
    eyko: "Vincent Martínez",
    markdurrant: "Mark Durrant",
    danielrbradley: "Daniel Bradley",
    wardm: "Matt Ward",
    andreamis1: "Andrea Miskulin",
    akashchopra: "Akash Chopra",
    simonhdickson: "Simon Dickson",
    tsquires10: "Tom Squires",
    jameswallacepebble: "James Wallace",
    nbevans: "Nathan Evans",
    andypebble: "Andy Wardle",
    svnlto: "Sven Lito",
    serbio666: "Fergus Hynd"
  };

  // Link authors to their relevant people page
  $(".post-meta .author").each(function() {
    var tumblrName = this.innerHTML;
    var authorName = tumblrAuthors[tumblrName] || tumblrName;

    this.innerHTML = authorName;
  });
})();