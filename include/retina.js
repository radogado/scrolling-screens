(function(){var c,d=Array.prototype.indexOf||function(b){for(var a=0,c=this.length;a<c;a++)if(this[a]===b)return a;return-1};c=function(){function b(a){this.path=a;a=this.path.split(".");this.at_2x_path=""+a.slice(0,a.length-1).join(".")+"@2x."+a[a.length-1]}b.confirmed_paths=[];b.prototype.is_external=function(){return!(!this.path.match(/^https?\:/i)||this.path.match("//"+document.domain))};b.prototype.has_2x_variant=function(){var a;if(this.is_external())return!1;if(a=this.at_2x_path,0<=d.call(b.confirmed_paths,
a))return!0;a=new XMLHttpRequest;a.open("HEAD",this.at_2x_path,!1);a.send();return 200===a.status?(b.confirmed_paths.push(this.at_2x_path),!0):!1};return b}();("undefined"!==typeof exports&&null!==exports?exports:window).RetinaImagePath=c}).call(this);
(function(){var c,d=function(b,a){return function(){return b.apply(a,arguments)}};c=function(){function b(a){this.el=a;this.path=new RetinaImagePath(this.el.getAttribute("src"));this.path.has_2x_variant()&&this.swap()}b.prototype.swap=function(a){var b;null==a&&(a=this.path.at_2x_path);return(b=d(function(){if(this.el.complete){this.el.setAttribute("width",this.el.offsetWidth);this.el.setAttribute("height",this.el.offsetHeight);return this.el.setAttribute("src",a)}return setTimeout(b,5)},this))()};
return b}();("undefined"!==typeof exports&&null!==exports?exports:window).RetinaImage=c}).call(this);(function(){1<window.devicePixelRatio&&(window.onload=function(){var c,d,b,a,e;a=document.getElementsByTagName("img");e=[];d=0;for(b=a.length;d<b;d++)c=a[d],e.push(new RetinaImage(c));return e})}).call(this);