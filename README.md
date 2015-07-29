## angular-css-progress [![Build Status](https://travis-ci.org/FluidApps/angular-css-progress.png?branch=master)](https://travis-ci.org/FluidApps/angular-css-progress)

A directive for AngularJS for displaying progress indicators with CSS only.

### Installation

```
bower i angular-css-progress --save
```

### Usage

#### Include it

```html
<link rel="stylesheet" href="bower_components/angular-css-progress/dist/angular-css-progress.min.css">
<script src="bower_components/angular-css-progress/dist/angular-css-progress-tpls.min.js"></script>
```

#### Load it

```javascript
angular.module('myApp', ['angular-css-progress']);
```

#### Use it

```html
<div fa-css-progress min="myModel.min" current="myModel.current" max="myModel.max"></div>
```
