/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-webgl-setclasses !*/
 //!function(e,n,t){function o(e,n){return typeof e===n}function s(){var e,n,t,s,a,i,f;for(var c in l)if(l.hasOwnProperty(c)){if(e=[],n=l[c],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],f=i.split("."),1===f.length?Modernizr[f[0]]=s:(!Modernizr[f[0]]||Modernizr[f[0]]instanceof Boolean||(Modernizr[f[0]]=new Boolean(Modernizr[f[0]])),Modernizr[f[0]][f[1]]=s),r.push((s?"":"no-")+f.join("-"))}}function a(e){var n=c.className,t=Modernizr._config.classPrefix||"";if(u&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),u?c.className.baseVal=n:c.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):u?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}var r=[],l=[],f={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){l.push({name:e,fn:n,options:t})},addAsyncTest:function(e){l.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=f,Modernizr=new Modernizr;var c=n.documentElement,u="svg"===c.nodeName.toLowerCase();Modernizr.addTest("webgl",function(){var n=i("canvas"),t="probablySupportsContext"in n?"probablySupportsContext":"supportsContext";return t in n?n[t]("webgl")||n[t]("experimental-webgl"):"WebGLRenderingContext"in e}),s(),a(r),delete f.addTest,delete f.addAsyncTest;for(var p=0;p<Modernizr._q.length;p++)Modernizr._q[p]();e.Modernizr=Modernizr}(window,document);
 /*!
  * Useragnt
  * v0.3.1
  * 
  * Copyright (c) 2016 Yuichiroh Arai
  * Released under the MIT license
  * http://opensource.org/licenses/mit-license.php
  * 
  * detects: mobile, tablet, pc, windows, mac, linux, ios, android, edge, ie, safari, chrome, firefox, opera
 !*/
!function(e,o){function i(e){return n.indexOf(e)!=-1}function r(e){var o=e.split("."),i={};return i.str=e,i.float=parseFloat(e)||0,i.major=o.length>0?parseInt(o[0])||0:0,i.minor=o.length>1?parseInt(o[1])||0:0,i.build=o.length>2?parseInt(o[2])||0:0,i.revision=o.length>3?parseInt(o[3])||0:0,i}var a={};a._detects=["mobile","tablet","pc","windows","mac","linux","ios","android","edge","ie","safari","chrome","firefox","opera"];var n=a.userAgent=e.navigator.userAgent.toLowerCase();a.mobile=i("iphone")||i("ipod")||i("android")&&i("mobile")||i("windows")&&i("phone")||i("firefox")&&i("mobile")||i("blackberry"),a.tablet=i("ipad")||i("android")&&!i("mobile")||i("windows")&&i("touch")&&!i("tablet pc")||i("firefox")&&i("tablet")||i("kindle")||i("silk")||i("playbook"),a.pc=!i("iphone")&&!i("ipod")&&!i("ipad")&&!i("android")&&(!i("windows")||!i("phone")&&(!i("touch")||i("tablet pc")))&&(!i("firefox")||!i("mobile")&&!i("tablet"))&&!i("blackberry")&&!i("kindle")&&!i("silk")&&!i("playbook"),a.windows=i("windows"),a.mac=i("mac os x")&&!i("iphone")&&!i("ipad")&&!i("ipod"),a.linux=i("linux")&&!i("android"),a.ios=i("iphone")||i("ipad")||i("ipod"),a.ios&&(a.ios=new Boolean(!0),n.match(/ os ([\d_]+)/g),a.ios.version=r(RegExp.$1.replace("_","."))),a.android=i("android"),a.android&&(a.android=new Boolean(!0),n.match(/android ([\d\.]+)/g),a.android.version=r(RegExp.$1)),a.edge=i("edge"),a.ie=i("trident")||i("msie"),a.safari=i("safari")&&!i("android")&&!i("edge")&&!i("opera")&&!i("opr")&&!i("chrome"),a.chrome=i("chrome")&&!i("edge")&&!i("opera")&&!i("opr"),a.chrome&&(a.chrome=new Boolean(!0),n.match(/chrome\/([\d.]+)/g),a.chrome.version=r(RegExp.$1)),a.firefox=i("firefox")&&!i("edge"),a.opera=i("opera")||i("opr");var d,t,s,l=a._classPrefix="",p=o.documentElement,c=p.className;for(t=a._detects.length,d=0;d<t;d++)s=a._detects[d],c+=a[s]?" "+l+s:" "+l+"no-"+s;p.className=c,e.Useragnt=a}(window,document);