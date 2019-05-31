// 时间格式化
const Util = {
  formatTime: (date, format = "YY-MM-DD h:m:s") => {
    date = date instanceof Date ? date : new Date(date || Date.now());
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    switch (format) {
      case "YY/MM/DD h:m:s":
        return (
          [year, month, day]
            .map(n => {
              n = n.toString();
              return n[1] ? n : "0" + n;
            })
            .join("/") +
          " " +
          [hour, minute, second]
            .map(n => {
              n = n.toString();
              return n[1] ? n : "0" + n;
            })
            .join(":")
        );
        break;
      case "YYMMDD hms":
        return (
          [year, month, day]
            .map(n => {
              n = n.toString();
              return n[1] ? n : "0" + n;
            })
            .join("") +
          " " +
          [hour, minute, second]
            .map(n => {
              n = n.toString();
              return n[1] ? n : "0" + n;
            })
            .join("")
        );
        break;
      case "YY-MM-DD h:m:s":
        return (
          [year, month, day]
            .map(n => {
              n = n.toString();
              return n[1] ? n : "0" + n;
            })
            .join("-") +
          " " +
          [hour, minute, second]
            .map(n => {
              n = n.toString();
              return n[1] ? n : "0" + n;
            })
            .join(":")
        );
        break;
      case "YY/MM/DD":
        return [year, month, day]
          .map(n => {
            n = n.toString();
            return n[1] ? n : "0" + n;
          })
          .join("/");
        break;
      case "YYMMDD":
        return [year, month, day]
          .map(n => {
            n = n.toString();
            return n[1] ? n : "0" + n;
          })
          .join("");
        break;
      case "YY-MM-DD":
        return [year, month, day]
          .map(n => {
            n = n.toString();
            return n[1] ? n : "0" + n;
          })
          .join("-");
        break;
      default:
        return null;
    }
  },

  formatTimeS: () => {
    let date = new Date();
    return (
      "" +
      date.getFullYear() +
      Util.formatNumber(date.getMonth() + 1) +
      Util.formatNumber(date.getDate()) +
      Util.formatNumber(date.getHours()) +
      Util.formatNumber(date.getMinutes()) +
      Util.formatNumber(date.getSeconds()) +
      Util.formatNumber(date.getMilliseconds())
    );
  },

  fillArray: n => {
    let m = new Array(n).fill(0);
    return m.map((item, id) => id + 1);
  },

  formatNumber: n => {
    n = n.toString();
    return n[1] ? n : "0" + n;
  },

  isArray: n => {
    if (!Array.isArray) {
      return Object.prototype.toString.call(n) == "[object Array]";
    } else {
      return Array.isArray(n);
    }
  },

  isEmptyArr: n => {
    return Util.isArray(n) && n.length == 0;
  },

  isApp: () => {
    return navigator.userAgent.indexOf("HybridAPP") > -1;
  },

  isWx: () => {
    return navigator.userAgent.indexOf("MicroMessenger") > -1;
  },

  isAndriod: () => {
    return (
      navigator.userAgent.indexOf("Android") > -1 ||
      navigator.userAgent.indexOf("Adr") > -1
    );
  },

  isIOS: () => {
    return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  },

  getAppInfo: () => {
    let ua = navigator.userAgent;
    if (!Util.isApp) return {};
    let index = ua.indexOf("HybridAPP");
    let appInfo = ua.substr(index);
    return {
      os: appInfo.split("/")[2],
      app_verison: appInfo.split("/")[1]
    };
  },

  linkToH5(url) {
    if (!url || url == "undefined") return;
    window.location.href = url;
  }
};

// export { formatTime, fillArray, formatTimeS };
export default Util;
