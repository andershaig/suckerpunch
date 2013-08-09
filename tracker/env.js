// Gets Test Environment
(function (Env, undefined) {

  // Env Detection
  Env.browser = function () {
    return {
      browser: search(Env.data.browser),
      version: search(navigator.userAgent) || search(navigator.appVersion),
      os:      search(Env.data.os)
    }
  }

  // Private Search Function
  var search = function (data) {
    if (typeof data === "object") {
      // search for string match
      for(var i = 0; i < data.length; i++) {
        var dataString = data[i].string,
            dataProp   = data[i].prop;
        this.version_string = data[i].versionSearch || data[i].identity;
        if (dataString) {
          if (dataString.indexOf(data[i].subString) != -1) {
            return data[i].identity;
          }
        } else if (dataProp){
          return data[i].identity;
        }
      }
    } else {
      // search for version number
      var index = data.indexOf(this.version_string);
      if (index == -1) return;
      
      return parseFloat(data.substr(index + this.version_string.length + 1));
    }
  }

  // Browser Data
  Env.data = {
    browser: [
      { string: navigator.userAgent, subString: "Chrome",   identity: "Chrome"                              },
      { string: navigator.userAgent, subString: "OmniWeb",  identity: "OmniWeb",  versionSearch: "OmniWeb/" },
      { string: navigator.vendor,    subString: "Apple",    identity: "Safari",   versionSearch: "Version"  },
      { prop:   window.opera,                               identity: "Opera",    versionSearch: "Version"  },
      { string: navigator.vendor,    subString: "iCab",     identity: "iCab"                                },
      { string: navigator.vendor,    subString: "KDE",      identity: "Konqueror"                           },
      { string: navigator.userAgent, subString: "Firefox",  identity: "Firefox"                             },
      { string: navigator.vendor,    subString: "Camino",   identity: "Camino"                              },
      { string: navigator.userAgent, subString: "Netscape", identity: "Netscape"                            },
      { string: navigator.userAgent, subString: "MSIE",     identity: "Explorer", versionSearch: "MSIE"     },
      { string: navigator.userAgent, subString: "Gecko",    identity: "Mozilla",  versionSearch: "rv"       },
      { string: navigator.userAgent, subString: "Mozilla",  identity: "Netscape", versionSearch: "Mozilla"  }
    ],
    os: [
      { string: navigator.platform,  subString: "Win",     identity: "Windows"     },
      { string: navigator.platform,  subString: "Mac",     identity: "Mac"         },
      { string: navigator.userAgent, subString: "iPhone",  identity: "iPhone/iPod" },
      { string: navigator.userAgent, subString: "iPad",    identity: "iPad"        },
      { string: navigator.userAgent, subString: "Android", identity: "Android"     },
      { string: navigator.platform,  subString: "Linux",   identity: "Linux"       }
  ]};

  // Check device (width / height)
  Env.device = function () {
    var device = {
      screen: {
        width:  window.screen.width,
        height: window.screen.height
      }
    };
    device.viewport = {
      width:  window.innerWidth  || document.documentElement.clientWidth  || document.body.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight 
    };
    device.is_tablet = !!navigator.userAgent.match(/(iPad|SCH-I800|xoom|kindle)/i);
    device.is_phone  = !device.is_tablet && !!navigator.userAgent.match(/(iPhone|iPod|blackberry|android 0.5|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i);
    device.is_mobile = device.is_tablet || device.is_phone;

    return device;
  }
  
  // Check Plugins
  Env.plugins = function () {
    var check_plugin = function (name) {
      if (navigator.plugins) {
        var plugin, i = 0, length = navigator.plugins.length;

        for (; i < length; i++ ) {
          plugin = navigator.plugins[i];
          if (plugin && plugin.name && plugin.name.toLowerCase().indexOf(name) !== -1) {
            return true;
          }
        }

        return false;
      }

      return false;
    };

    return {
      java:        check_plugin("java"),
      flash:       check_plugin("flash"),
      quicktime:   check_plugin("quicktime"),
      silverlight: check_plugin("silverlight")
    };
  }

}(window.Env = window.Env || {}));