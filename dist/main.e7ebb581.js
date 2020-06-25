// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $(".siteList");
var $lastLi = $siteList.find(".last");
var localData = localStorage.getItem("localData");
var dataObject = JSON.parse(localData);
var hashMap = dataObject || [{
  logo: "Bootstrap",
  url: "https://v3.bootcss.com"
}, {
  logo: "jQuery",
  url: "https://www.jquery123.com"
}, {
  logo: "Vue.js",
  url: "https://cn.vuejs.org"
}, {
  logo: "React.js",
  url: "https://zh-hans.reactjs.org"
}, {
  logo: "Angular.js",
  url: "https://www.angularjs.net.cn"
}, {
  logo: "webpack",
  url: "https://www.webpackjs.com"
}, {
  logo: "Github",
  url: "https://github.com"
}, {
  logo: "node.js",
  url: "http://nodejs.cn"
}, {
  logo: "npm",
  url: "https://www.npmjs.com"
}, {
  logo: "JS Bin",
  url: "http://jsbin.com"
}, {
  logo: "Figma",
  url: "https://figma.com"
}, {
  logo: "Google",
  url: "https://google.com"
}];

var handleUrl = function handleUrl(url) {
  return url.replace("https://", "").replace("https://", "").replace("www.", "").replace(".com", "").replace(".cn", "").replace(".org", "").replace(/\/.*/, "");
};

var render = function render() {
  $siteList.find("li:not(.last)").remove();
  console.log(hashMap);
  hashMap.forEach(function (node, index) {
    var $li = $("<li class=\"site\">\n        <div class=\"link\">".concat(handleUrl(node.logo), "</div>\n        <div class=\"deleteBox\">\n            <svg class=\"icon delete\">\n                <use xlink:href=\"#icon-delete\"></use>\n            </svg>\n        </div>\n        \n      </li>")).insertBefore($lastLi);
    $li.on("click", function () {
      window.open(node.url);
    });
    $li.on("click", ".deleteBox", function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();
$(".addButton").on("click", function () {
  var url = window.prompt("请输入网址");

  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }

  hashMap.push({
    logo: handleUrl(url),
    url: url
  });
  render();
  console.log(hashMap);
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem("localData", string);
}; // 键盘事件


$(document).on("keypress", function (e) {
  var key = e.key;
  console.log(key);

  for (var i = 0; i < hashMap.length; i++) {
    console.log(hashMap[i].logo.toLowerCase());

    if (hashMap[i].logo.toLowerCase()[0] === key) {
      console.log("执行了");
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.e7ebb581.js.map