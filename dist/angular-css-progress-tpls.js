angular.module('angular-css-progress', []).directive('faCssProgress', function() {
  var scope = {
    min: '=?',
    current: '=',
    max: '=?'
  };
  
  var templateUrl = function(elem, attrs) {
    var supportedShapes = ['circle'];
    
    if (!attrs.type || supportedShapes.indexOf(attrs.type) < 0) {
      attrs.type = 'circle';
    }
    
    return 'angular-css-progress-' + attrs.type + '.html';
  };
  
  var link = function(scope, element, attrs) {
    if (element.length !== 1) {
      return;
    }
    
    element = element[0];
    
    scope.min = parseInt(scope.min || 0, 10);
    scope.current = parseInt(scope.current, 10);
    scope.max = parseInt(scope.max || 100, 10);
    
    var progress = Math.floor((scope.current / scope.max) * 100);
    
    var clearProgress = function(element) {
      var elements = element.querySelectorAll(".animate-75-100-b, .animate-50-75-b, .animate-25-50-b, .animate-0-25-b");
      
      for (var i = 0, length = elements.length; i < length; i++) {
        prefixCss(elements[i], 'transform', "rotate(90deg)");
      }
    };
    
    var prefixCss = function(element, property, value) {
      var prefixes = ['Webkit', 'Moz', 'ms', 'O'];
      
      element.style[property] = value;
      property = property.charAt(0).toUpperCase() + property.substring(1);
      
      for (var i = 0, length = prefixes.length; i < length; i++) {
        element.style[prefixes[i] + property] = value;
      }
    };
    
    clearProgress(element);
    
    element.querySelector(".text").innerHTML = progress + "%";
    
    var angle, elements, i, length;
    
    if (progress < 25) {
      angle = -90 + (progress / 100) * 360;
      
      prefixCss(element.querySelector(".animate-0-25-b"), 'transform', "rotate(" + angle + "deg)");
    } else if (progress >= 25 && progress < 50) {
      angle = -90 + ((progress - 25) / 100) * 360;
      
      prefixCss(element.querySelector(".animate-0-25-b"), 'transform', "rotate(0deg)");
      prefixCss(element.querySelector(".animate-25-50-b"), 'transform', "rotate(" + angle + "deg)");
    } else if (progress >= 50 && progress < 75) {
      angle = -90 + ((progress - 50) / 100) * 360;
      elements = element.querySelectorAll(".animate-25-50-b, .animate-0-25-b");
      
      for (i = 0, length = elements.length; i < length; i++) {
        prefixCss(elements[i], 'transform', "rotate(0deg)");
      }
      prefixCss(element.querySelector(".animate-50-75-b"), 'transform', "rotate(" + angle + "deg)");
    } else if (progress >= 75) {
      if (progress > 100) {
        progress = 100;
      }
      
      angle = -90 + ((progress - 75) / 100) * 360;
      elements = element.querySelectorAll(".animate-50-75-b, .animate-25-50-b, .animate-0-25-b");
      
      for (i = 0, length = elements.length; i < length; i++) {
        prefixCss(elements[i], 'transform', "rotate(0deg)");
      }
      
      prefixCss(element.querySelector(".animate-75-100-b"), 'transform', "rotate(" + angle + "deg)");
    }
  };
  
  var faCssProgress = {
    restrict: 'A',
    replace: true,
    scope: scope,
    templateUrl: templateUrl,
    link: link
  };
  
  return faCssProgress;
});

angular.module('angular-css-progress').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('angular-css-progress-circle.html',
    "<div class=fa-css-progress-circle><div class=text></div><div class=progress-bg></div><div class=\"spiner-holder animate-0-25-a\"><div style=\"transform: rotate(0deg)\" class=\"spiner animate-0-25-b\"><div class=loader></div></div></div><div class=\"spiner-holder animate-25-50-a\"><div style=\"transform: rotate(0deg)\" class=\"spiner animate-25-50-b\"><div class=loader></div></div></div><div class=\"spiner-holder animate-50-75-a\"><div style=\"transform: rotate(-25.2deg)\" class=\"spiner animate-50-75-b\"><div class=loader></div></div></div><div class=\"spiner-holder animate-75-100-a\"><div style=\"transform: rotate(90deg)\" class=\"spiner animate-75-100-b\"><div class=loader></div></div></div></div>"
  );

}]);
