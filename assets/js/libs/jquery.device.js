/* Modernizr 2.7.1 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-flexboxlegacy-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-shiv-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function C(a){j.cssText=a}function D(a,b){return C(n.join(a+";")+(b||""))}function E(a,b){return typeof a===b}function F(a,b){return!!~(""+a).indexOf(b)}function G(a,b){for(var d in a){var e=a[d];if(!F(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function H(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:E(f,"function")?f.bind(d||b):f}return!1}function I(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return E(b,"string")||E(b,"undefined")?G(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),H(e,b,c))}function J(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.7.1",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=E(e[d],"function"),E(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),A={}.hasOwnProperty,B;!E(A,"undefined")&&!E(A.call,"undefined")?B=function(a,b){return A.call(a,b)}:B=function(a,b){return b in a&&E(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return I("flexWrap")},s.flexboxlegacy=function(){return I("boxDirection")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!E(b.createElement("canvas").getContext("2d").fillText,"function")},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!I("indexedDB",a)},s.hashchange=function(){return z("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!!a.history&&!!history.pushState},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return C("background-color:rgba(150,255,150,.5)"),F(j.backgroundColor,"rgba")},s.hsla=function(){return C("background-color:hsla(120,40%,100%,.5)"),F(j.backgroundColor,"rgba")||F(j.backgroundColor,"hsla")},s.multiplebgs=function(){return C("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return I("backgroundSize")},s.borderimage=function(){return I("borderImage")},s.borderradius=function(){return I("borderRadius")},s.boxshadow=function(){return I("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return D("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return I("animationName")},s.csscolumns=function(){return I("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return C((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),F(j.backgroundImage,"gradient")},s.cssreflections=function(){return I("boxReflect")},s.csstransforms=function(){return!!I("transform")},s.csstransforms3d=function(){var a=!!I("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return I("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var K in s)B(s,K)&&(x=K.toLowerCase(),e[x]=s[K](),v.push((e[x]?"":"no-")+x));return e.input||J(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)B(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},C(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.hasEvent=z,e.testProp=function(a){return G([a])},e.testAllProps=I,e.testStyles=y,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};

/*!
 * Detectizr v@VERSION
 * http://barisaydinoglu.github.com/Detectizr/
 *
 * Written by Baris Aydinoglu (http://baris.aydinoglu.info) - Copyright 2012
 * Released under the MIT license
 *
 * Date: @DATE
 */
window.Detectizr = (function(window, navigator, document, undefined) {
  var Detectizr = {},
    Modernizr = window.Modernizr,
    deviceTypes = ["tv", "tablet", "mobile", "desktop"],
    options = {
      // option for enabling HTML classes of all features (not only the true features) to be added
      addAllFeaturesAsClass: false,
      // option for enabling detection of device
      detectDevice: true,
      // option for enabling detection of device model
      detectDeviceModel: true,
      // option for enabling detection of screen size
      detectScreen: true,
      // option for enabling detection of operating system type and version
      detectOS: true,
      // option for enabling detection of browser type and version
      detectBrowser: true,
      // option for enabling detection of common browser plugins
      detectPlugins: true
    },
    plugins2detect = [{
      name: "adobereader",
      substrs: ["Adobe", "Acrobat"],
      // AcroPDF.PDF is used by version 7 and later
      // PDF.PdfCtrl is used by version 6 and earlier
      progIds: ["AcroPDF.PDF", "PDF.PDFCtrl.5"]
    }, {
      name: "flash",
      substrs: ["Shockwave Flash"],
      progIds: ["ShockwaveFlash.ShockwaveFlash.1"]
    }, {
      name: "wmplayer",
      substrs: ["Windows Media"],
      progIds: ["wmplayer.ocx"]
    }, {
      name: "silverlight",
      substrs: ["Silverlight"],
      progIds: ["AgControl.AgControl"]
    }, {
      name: "quicktime",
      substrs: ["QuickTime"],
      progIds: ["QuickTime.QuickTime"]
    }],
    rclass = /[\t\r\n]/g,
    docElement = document.documentElement,
    resizeTimeoutId,
    oldOrientation;

  // Create Global "extend" method, so Detectizr does not need jQuery.extend
  function extend(obj, extObj) {
    var a, b, i;
    if (arguments.length > 2) {
      for (a = 1, b = arguments.length; a < b; a += 1) {
        extend(obj, arguments[a]);
      }
    } else {
      for (i in extObj) {
        if (extObj.hasOwnProperty(i)) {
          obj[i] = extObj[i];
        }
      }
    }
    return obj;
  }

  // simplified and localized indexOf method as one parameter fixed as useragent
  function is(key) {
    return Detectizr.browser.userAgent.indexOf(key) > -1;
  }

  // simplified and localized regex test method as one parameter fixed as useragent
  function test(regex) {
    return regex.test(Detectizr.browser.userAgent);
  }

  // simplified and localized regex exec method as one parameter fixed as useragent
  function exec(regex) {
    return regex.exec(Detectizr.browser.userAgent);
  }

  // localized string trim method
  function trim(value) {
    return value.replace(/^\s+|\s+$/g, "");
  }

  // convert string to camelcase
  function toCamel(string) {
    if (string === null || string === undefined) {
      return "";
    }
    return String(string).replace(/((\s|\-|\.)+[a-z0-9])/g, function($1) {
      return $1.toUpperCase().replace(/(\s|\-|\.)/g, "");
    });
  }

  // removeClass function inspired from jQuery.removeClass
  function removeClass(element, value) {
    var class2remove = value || "",
      cur = element.nodeType === 1 && (element.className ? (" " + element.className + " ").replace(rclass, " ") : "");
    if (cur) {
      while (cur.indexOf(" " + class2remove + " ") >= 0) {
        cur = cur.replace(" " + class2remove + " ", " ");
      }
      element.className = value ? trim(cur) : "";
    }
  }

  // add version test to Modernizr
  function addVersionTest(version, major, minor) {
    if (!!version) {
      version = toCamel(version);
      if (!!major) {
        major = toCamel(major);
        addConditionalTest(version + major, true);
        if (!!minor) {
          addConditionalTest(version + major + "_" + minor, true);
        }
      }
    }
  }

  // add test to Modernizr based on a condition
  function addConditionalTest(feature, test) {
    if (!!feature && !!Modernizr) {
      if (options.addAllFeaturesAsClass) {
        Modernizr.addTest(feature, test);
      } else {
        test = typeof test === "function" ? test() : test;
        if (test) {
          Modernizr.addTest(feature, true);
        } else {
          delete Modernizr[feature];
          removeClass(docElement, feature);
        }
      }
    }
  }

  // set version based on versionFull
  function setVersion(versionType, versionFull) {
    versionType.version = versionFull;
    var versionArray = versionFull.split(".");
    if (versionArray.length > 0) {
      versionArray = versionArray.reverse();
      versionType.major = versionArray.pop();
      if (versionArray.length > 0) {
        versionType.minor = versionArray.pop();
        if (versionArray.length > 0) {
          versionArray = versionArray.reverse();
          versionType.patch = versionArray.join(".");
        } else {
          versionType.patch = "0";
        }
      } else {
        versionType.minor = "0";
      }
    } else {
      versionType.major = "0";
    }
  }

  function checkOrientation() {
    //timeout wrapper points with doResizeCode as callback
    window.clearTimeout(resizeTimeoutId);
    resizeTimeoutId = window.setTimeout(function() {
      oldOrientation = Detectizr.device.orientation;
      //wrapper for height/width check
      if (window.innerHeight > window.innerWidth) {
        Detectizr.device.orientation = "portrait";
      } else {
        Detectizr.device.orientation = "landscape";
      }
      addConditionalTest(Detectizr.device.orientation, true);
      if (oldOrientation !== Detectizr.device.orientation) {
        addConditionalTest(oldOrientation, false);
      }
    }, 10);
  }

  function detectPlugin(substrs) {
    var plugins = navigator.plugins,
      plugin, haystack, pluginFoundText, j, k;
    for (j = plugins.length - 1; j >= 0; j--) {
      plugin = plugins[j];
      haystack = plugin.name + plugin.description;
      pluginFoundText = 0;
      for (k = substrs.length; k >= 0; k--) {
        if (haystack.indexOf(substrs[k]) !== -1) {
          pluginFoundText += 1;
        }
      }
      if (pluginFoundText === substrs.length) {
        return true;
      }
    }
    return false;
  }

  function detectObject(progIds) {
    var j;
    for (j = progIds.length - 1; j >= 0; j--) {
      try {
        new ActiveXObject(progIds[j]);
      } catch (e) {
        // Ignore
      }
    }
    return false;
  }

  function detect(opt) {
    var i, j, device, os, browser, plugin2detect, pluginFound;

    options = extend({}, options, opt || {});

    /** Device detection **/
    if (options.detectDevice) {
      Detectizr.device = {
        type: "",
        model: "",
        orientation: ""
      };
      device = Detectizr.device;
      if (test(/googletv|smarttv|smart-tv|internet.tv|netcast|nettv|appletv|boxee|kylo|roku|dlnadoc|roku|pov_tv|hbbtv|ce\-html/)) {
        // Check if user agent is a smart tv
        device.type = deviceTypes[0];
        device.model = "smartTv";
      } else if (test(/xbox|playstation.3|wii/)) {
        // Check if user agent is a game console
        device.type = deviceTypes[0];
        device.model = "gameConsole";
      } else if (test(/ip(a|ro)d/)) {
        // Check if user agent is a iPad
        device.type = deviceTypes[1];
        device.model = "ipad";
      } else if ((test(/tablet/) && !test(/rx-34/) && !test(/shield/)) || test(/folio/)) {
        // Check if user agent is a Tablet
        device.type = deviceTypes[1];
        device.model = String(exec(/playbook/) || "");
      } else if (test(/linux/) && test(/android/) && !test(/fennec|mobi|htc.magic|htcX06ht|nexus.one|sc-02b|fone.945/)) {
        // Check if user agent is an Android Tablet
        device.type = deviceTypes[1];
        device.model = "android";
      } else if (test(/kindle/) || (test(/mac.os/) && test(/silk/))) {
        // Check if user agent is a Kindle or Kindle Fire
        device.type = deviceTypes[1];
        device.model = "kindle";
      } else if (test(/gt-p10|sc-01c|shw-m180s|sgh-t849|sch-i800|shw-m180l|sph-p100|sgh-i987|zt180|htc(.flyer|\_flyer)|sprint.atp51|viewpad7|pandigital(sprnova|nova)|ideos.s7|dell.streak.7|advent.vega|a101it|a70bht|mid7015|next2|nook/) || (test(/mb511/) && test(/rutem/))) {
        // Check if user agent is a pre Android 3.0 Tablet
        device.type = deviceTypes[1];
        device.model = "android";
      } else if (test(/bb10/)) {
        // Check if user agent is a BB10 device
        device.type = deviceTypes[2];
        device.model = "blackberry";
      } else {
        // Check if user agent is one of common mobile types
        device.model = exec(/iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec|j2me/);
        if (device.model !== null) {
          device.type = deviceTypes[2];
          device.model = String(device.model);
        } else {
          device.model = "";
          if (test(/bolt|fennec|iris|maemo|minimo|mobi|mowser|netfront|novarra|prism|rx-34|skyfire|tear|xv6875|xv6975|google.wireless.transcoder/)) {
            // Check if user agent is unique Mobile User Agent
            device.type = deviceTypes[2];
          } else if (test(/opera/) && test(/windows.nt.5/) && test(/htc|xda|mini|vario|samsung\-gt\-i8000|samsung\-sgh\-i9/)) {
            // Check if user agent is an odd Opera User Agent - http://goo.gl/nK90K
            device.type = deviceTypes[2];
          } else if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
            device.type = deviceTypes[1];
          } else if ((test(/windows.(nt|xp|me|9)/) && !test(/phone/)) || test(/win(9|.9|nt)/) || test(/\(windows 8\)/)) {
            // Check if user agent is Windows Desktop, "(Windows 8)" Chrome extra exception
            device.type = deviceTypes[3];
          } else if (test(/macintosh|powerpc/) && !test(/silk/)) {
            // Check if agent is Mac Desktop
            device.type = deviceTypes[3];
            device.model = "mac";
          } else if (test(/linux/) && test(/x11/)) {
            // Check if user agent is a Linux Desktop
            device.type = deviceTypes[3];
          } else if (test(/solaris|sunos|bsd/)) {
            // Check if user agent is a Solaris, SunOS, BSD Desktop
            device.type = deviceTypes[3];
          } else if (test(/cros/)) {
            // Check if user agent is a Chromebook
            device.type = deviceTypes[3];
          } else if (test(/bot|crawler|spider|yahoo|ia_archiver|covario-ids|findlinks|dataparksearch|larbin|mediapartners-google|ng-search|snappy|teoma|jeeves|tineye/) && !test(/mobile/)) {
            // Check if user agent is a Desktop BOT/Crawler/Spider
            device.type = deviceTypes[3];
            device.model = "crawler";
          } else {
            // Otherwise assume it is a Mobile Device
            device.type = deviceTypes[2];
          }
        }
      }
      for (i = 0, j = deviceTypes.length; i < j; i += 1) {
        addConditionalTest(deviceTypes[i], (device.type === deviceTypes[i]));
      }
      if (options.detectDeviceModel) {
        addConditionalTest(toCamel(device.model), true);
      }
    }

    /** Screen detection **/
    if (options.detectScreen) {
      device.screen = {};
      if (!!Modernizr && !!Modernizr.mq) {
        if (Modernizr.mq("only screen and (max-width: 240px)")) {
          device.screen.size = "veryVerySmall";
          addConditionalTest("veryVerySmallScreen", true);
        } else if (Modernizr.mq("only screen and (max-width: 320px)")) {
          device.screen.size = "verySmall";
          addConditionalTest("verySmallScreen", true);
        } else if (Modernizr.mq("only screen and (max-width: 480px)")) {
          device.screen.size = "small";
          addConditionalTest("smallScreen", true);
        }
        if (device.type === deviceTypes[1] || device.type === deviceTypes[2]) {
          if (Modernizr.mq("only screen and (-moz-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)")) {
            device.screen.resolution = "high";
            addConditionalTest("highresolution", true);
          }
        }
      }
//      if (device.type === deviceTypes[1] || device.type === deviceTypes[2]) {
        window.onresize = function(event) {
          checkOrientation(event);
        };
        checkOrientation();
//      } else {
//        device.orientation = "landscape";
//        addConditionalTest(device.orientation, true);
//     }
    }

    /** OS detection **/
    if (options.detectOS) {
      Detectizr.os = {};
      os = Detectizr.os;
      if (device.model !== "") {
        if (device.model === "ipad" || device.model === "iphone" || device.model === "ipod") {
          os.name = "ios";
          setVersion(os, (test(/os\s([\d_]+)/) ? RegExp.$1 : "").replace(/_/g, "."));
        } else if (device.model === "android") {
          os.name = "android";
          setVersion(os, (test(/android\s([\d\.]+)/) ? RegExp.$1 : ""));
        } else if (device.model === "blackberry") {
          os.name = "blackberry";
          setVersion(os, (test(/version\/([^\s]+)/) ? RegExp.$1 : ""));
        } else if (device.model === "playbook") {
          os.name = "blackberry";
          setVersion(os, (test(/os ([^\s]+)/) ? RegExp.$1.replace(";", "") : ""));
        }
      }
      if (!os.name) {
        if (is("win") || is("16bit")) {
          os.name = "windows";
          if (is("windows nt 10")) {
            setVersion(os, "10");
          } else if (is("windows nt 6.3")) {
            setVersion(os, "8.1");
          } else if (is("windows nt 6.2") || test(/\(windows 8\)/)) { //windows 8 chrome mac fix
            setVersion(os, "8");
          } else if (is("windows nt 6.1")) {
            setVersion(os, "7");
          } else if (is("windows nt 6.0")) {
            setVersion(os, "vista");
          } else if (is("windows nt 5.2") || is("windows nt 5.1") || is("windows xp")) {
            setVersion(os, "xp");
          } else if (is("windows nt 5.0") || is("windows 2000")) {
            setVersion(os, "2k");
          } else if (is("winnt") || is("windows nt")) {
            setVersion(os, "nt");
          } else if (is("win98") || is("windows 98")) {
            setVersion(os, "98");
          } else if (is("win95") || is("windows 95")) {
            setVersion(os, "95");
          }
        } else if (is("mac") || is("darwin")) {
          os.name = "mac os";
          if (is("68k") || is("68000")) {
            setVersion(os, "68k");
          } else if (is("ppc") || is("powerpc")) {
            setVersion(os, "ppc");
          } else if (is("os x")) {
            setVersion(os, (test(/os\sx\s([\d_]+)/) ? RegExp.$1 : "os x").replace(/_/g, "."));
          }
        } else if (is("webtv")) {
          os.name = "webtv";
        } else if (is("x11") || is("inux")) {
          os.name = "linux";
        } else if (is("sunos")) {
          os.name = "sun";
        } else if (is("irix")) {
          os.name = "irix";
        } else if (is("freebsd")) {
          os.name = "freebsd";
        } else if (is("bsd")) {
          os.name = "bsd";
        }
      }
      if (!!os.name) {
        addConditionalTest(os.name, true);
        if (!!os.major) {
          addVersionTest(os.name, os.major);
          if (!!os.minor) {
            addVersionTest(os.name, os.major, os.minor);
          }
        }
      }
      if (test(/\sx64|\sx86|\swin64|\swow64|\samd64/)) {
        os.addressRegisterSize = "64bit";
      } else {
        os.addressRegisterSize = "32bit";
      }
      addConditionalTest(os.addressRegisterSize, true);
    }

    /** Browser detection **/
    if (options.detectBrowser) {
      browser = Detectizr.browser;
      if (!test(/opera|webtv/) && (test(/msie\s([\d\w\.]+)/) || is("trident"))) {
        browser.engine = "trident";
        browser.name = "ie";
        if (!window.addEventListener && document.documentMode && document.documentMode === 7) {
          setVersion(browser, "8.compat");
        } else if (test(/trident.*rv[ :](\d+)\./)) {
          setVersion(browser, RegExp.$1);
        } else {
          setVersion(browser, (test(/trident\/4\.0/) ? "8" : RegExp.$1));
        }
      } else if (is("firefox")) {
        browser.engine = "gecko";
        browser.name = "firefox";
        setVersion(browser, (test(/firefox\/([\d\w\.]+)/) ? RegExp.$1 : ""));
      } else if (is("gecko/")) {
        browser.engine = "gecko";
      } else if (is("opera")) {
        browser.name = "opera";
        browser.engine = "presto";
        setVersion(browser, (test(/version\/([\d\.]+)/) ? RegExp.$1 : (test(/opera(\s|\/)([\d\.]+)/) ? RegExp.$2 : "")));
      } else if (is("konqueror")) {
        browser.name = "konqueror";
      } else if (is("edge")) {
        browser.engine = "webkit";
        browser.name = "edge";
        setVersion(browser, (test(/edge\/([\d\.]+)/) ? RegExp.$1 : ""));
      } else if (is("chrome")) {
        browser.engine = "webkit";
        browser.name = "chrome";
        setVersion(browser, (test(/chrome\/([\d\.]+)/) ? RegExp.$1 : ""));
      } else if (is("iron")) {
        browser.engine = "webkit";
        browser.name = "iron";
      } else if (is("crios")) {
        browser.name = "chrome";
        browser.engine = "webkit";
        setVersion(browser, (test(/crios\/([\d\.]+)/) ? RegExp.$1 : ""));
      } else if (is("applewebkit/")) {
        browser.name = "safari";
        browser.engine = "webkit";
        setVersion(browser, (test(/version\/([\d\.]+)/) ? RegExp.$1 : ""));
      } else if (is("mozilla/")) {
        browser.engine = "gecko";
      }
      if (!!browser.name) {
        addConditionalTest(browser.name, true);
        if (!!browser.major) {
          addVersionTest(browser.name, browser.major);
          if (!!browser.minor) {
            addVersionTest(browser.name, browser.major, browser.minor);
          }
        }
      }
      addConditionalTest(browser.engine, true);

      // Browser Language
      browser.language = navigator.userLanguage || navigator.language;
      addConditionalTest(browser.language, true);
    }

    /** Plugin detection **/
    if (options.detectPlugins) {
      browser.plugins = [];
      for (i = plugins2detect.length - 1; i >= 0; i--) {
        plugin2detect = plugins2detect[i];
        pluginFound = false;
        if (window.ActiveXObject) {
          pluginFound = detectObject(plugin2detect.progIds);
        } else if (navigator.plugins) {
          pluginFound = detectPlugin(plugin2detect.substrs);
        }
        if (pluginFound) {
          browser.plugins.push(plugin2detect.name);
          addConditionalTest(plugin2detect.name, true);
        }
      }
      if (typeof navigator.javaEnabled === "function" && navigator.javaEnabled()) {
        browser.plugins.push("java");
        addConditionalTest("java", true);
      }
    }
  }
  Detectizr.detect = function(settings) {
    return detect(settings);
  };
  Detectizr.init = function() {
    if (Detectizr !== undefined) {
      Detectizr.browser = {
        userAgent: (navigator.userAgent || navigator.vendor || window.opera || "").toLowerCase()
      };
      Detectizr.detect();
    }
  };
  Detectizr.init();

  return Detectizr;
}(this, this.navigator, this.document));