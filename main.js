
/**
 * Main AngularJS Web Application
 */
var app = angular.module('vsApp', [
  'ngRoute',
  'updateMeta'
]);

/** 
 * Scope Functions
*/
app.run(function($rootScope, $http, $sce, $compile, $location) {
    // Text Parsing
    $rootScope.trustHTML = function(obj) {
      console.log(obj);
      obj = $sce.trustAsHtml(obj);
      return obj;
    };
    $rootScope.isActive = function(route) {
        return route === $location.path();
    };

    $rootScope.saveHTML = function(){
      console.log("Copying HTML");
      var el = angular.element(document.querySelector('#result'));
      
      el = el.html()
            .replace(/<!--[^>]*-->/gi, '')  // comments
            // .replace(/\n/g, '')  // minify
            .replace(/ng-.+?\b/g, '') // ng-tags
            .replace(/ng-.+?=".*?"/g, '') // ng-tags
            .replace(/class=""/g, '') // ng classes
            .replace(/[\u201C]/g, "&#8220;")  // quotes
            .replace(/[\u201D]/g, "&#8221;")  // quotes;

      window.el = el;
      console.log(el);

      var copyElement = document.createElement("textarea");
      copyElement.style.position = 'fixed';
      copyElement.style.opacity = '0';
      copyElement.textContent = el;
      var body = document.getElementsByTagName('body')[0];
      body.appendChild(copyElement);
      copyElement.select();
      document.execCommand('copy');
      body.removeChild(copyElement);
      
      alert("HTML successfully copied");
    };

    $rootScope.title = "YourSite — We excel at mediocre slogans.";
    $rootScope.url = "website.com";
    $rootScope.website = "YourSite";
    $rootScope.suffix = " — YourSite";
    $rootScope.company = "Example, Inc.";
    $rootScope.twitter = "@website";
    $rootScope.author = "Viputheshwar Sitaraman";
    $rootScope.email = "hello@website.com";
    $rootScope.metas = [{
      name:'description',
      content :'AngularJS Dynamic Metas'
    },{
      name:'keywords',
      content :'AngularJS, Dynamic, Metas'
    },{
      charset:'UTF8'
    }];

    $rootScope.spotify = function(scope) {
      scope.game[0].spotify = $sce.trustAsResourceUrl('https://open.spotify.com/embed/'+scope.game[0]['embed-type'].toLowerCase()+'/'+scope.game[0]['spotify-src'])
    } 
});


/**
 * Configure the Routes
 */
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    // Home
    .when("/", {
      templateUrl: "partials/terms.html", 
      controller: "PageCtrl"
    })
    .when("/disclaimer", {
      templateUrl: "partials/disclaimer.html", 
      controller: "PageCtrl",
    })
    .when("/terms", {
      templateUrl: "partials/terms.html", 
      controller: "PageCtrl",
    })
    .when("/privacy", {
      templateUrl: "partials/privacy.html", 
      controller: "PageCtrl",
    })
    .when("/cookies", {
      templateUrl: "partials/cookies.html", 
      controller: "PageCtrl",
    })  // else 404
    .otherwise("/404", {
      templateUrl: "partials/404.html", 
      controller: "PageCtrl"
  });
  $locationProvider.html5Mode(true);
}]
);

/**
 * Controls all Pages
 */
app.controller('PageCtrl', function ($scope, $location, $http) {
  console.log("Page Controller reporting for duty.");
  $scope.url = $location.absUrl();

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('[data-toggle="tooltip"]').tooltip()+

  $('body').scrollspy({
  	target: '#navbar'
  })
});