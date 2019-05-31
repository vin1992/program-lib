//  date.js 完成一个日历组件所涉及到的计算相关的方法集合
// 涉及到 月 ，日，星期的计算 都以实际习惯为准，比如 3 月 getMonth 后 是 2， 但默认传入的参数是 3

const helper = {
  dateMap: [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月"
  ],
  dayNums: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

  // 获取 每月 多少天
  getDayNumByMonth: (y, m) => {
    if (helper.isLeapYear(y)) {
      helper.dayNums[1] = 29;
    }

    return helper.dayNums[m - 1];
  },

  // 判断是否是闰年
  isLeapYear: y => {
    let year = typeof y == "number" ? y : Number(y);
    return (
      (year % 100 == 0 && year % 400) || (year % 100 != 0 && year % 4 == 0)
    );
  },

  // 判断 指定年份 指定月份的 1号 是周几
  getWeekOfFirstDay: (y, m) => {
    let dateStr = `${y}/${m}/1`;
    return new Date(dateStr).getDay();
  },

  // 月份 或者 日期 加 前导零
  fillZero: n => {
    let answer = String(n);
    return answer.length > 1 ? answer : "0" + answer;
  },

  // 计算 当前月份的 前一个月份 和 后一个月份
  getSiblingMonth: m => {
    let answer = {};
    if (m == 1) {
      answer["prev"] = helper.dateMap[helper.dateMap.length - 1];
      answer["curr"] = helper.dateMap[m - 1];
      answer["next"] = helper.dateMap[m];
    } else if (m == 12) {
      answer["prev"] = helper.dateMap[m - 2];
      answer["curr"] = helper.dateMap[m - 1];
      answer["next"] = helper.dateMap[0];
    } else {
      answer["prev"] = helper.dateMap[m - 2];
      answer["curr"] = helper.dateMap[m - 1];
      answer["next"] = helper.dateMap[m];
    }

    return answer;
  },

  // 计算前后一个月 所属的 年份和月份
  getSiblingMonthObj: (y, m) => {
    let answer = {};
    if (m == 1) {
      answer["prev"] = { year: y - 1, month: 12 };
      answer["next"] = { year: y, month: m + 1 };
    } else if (m == 12) {
      answer["prev"] = { year: y, month: m - 1 };
      answer["next"] = { year: y + 1, month: 1 };
    } else {
      answer["prev"] = { year: y, month: m - 1 };
      answer["next"] = { year: y, month: m + 1 };
    }
    return answer;
  },

  // 切换 月份
  switchCurrMonth: (y, m, direction, limit) => {
    let answer = {};
    if (direction == 1) {
      if (!helper.isEnabled(y, m, direction) && limit) {
        console.error("无法切换", y, m);
        return;
      }
      m += 1;
      if (m > 12) {
        m = 1;
        y += 1;
      }
    } else if (direction == -1) {
      if (!helper.isEnabled(y, m, direction) && limit) {
        console.error("无法切换", y, m);
        return;
      }
      m -= 1;
      if (m < 1) {
        m = 12;
        y -= 1;
      }
    }

    answer = {
      year: y,
      month: m
    };

    return answer;
  },

  // 将 今日 格式化为 2012/02/02
  formatToday: () => {
    let year = new Date().getFullYear();
    let month = helper.fillZero(new Date().getMonth() + 1);
    let date = helper.fillZero(new Date().getDate());

    let rs = `${year}/${month}/${date}`;
    return rs;
  },

  // 根据 年月日 得出 所在日历行数
  getLine: (y, m, d) => {
    let w = helper.getWeekOfFirstDay(y, m);
    console.log(Math.ceil((d + w) / 7), "当前行数");
    return Math.ceil((d + w) / 7);
  },

  // 根据限制条件 是否可以 切换 日历
  isEnabled: (y, m, direct) => {
    let orgStamp = new Date(y, m).getTime();

    let currYear = new Date().getFullYear();
    let currMonth = new Date().getMonth() + 1;
    let currStamp = new Date(currYear, currMonth).getTime();

    let { year, month } = helper.getSiblingMonthObj(currYear, currMonth)[
      "next"
    ];
    let nextStamp = new Date(year, month).getTime();

    console.log(
      y,
      m,
      "orgStamp:",
      orgStamp,
      "currStamp:",
      currStamp,
      "nextStamp:",
      nextStamp,
      "direct:",
      direct
    );

    if (orgStamp == currStamp && direct == 1) {
      return true;
    } else if (orgStamp == nextStamp && direct == -1) {
      return true;
    } else {
      return false;
    }
  }
};

export default helper;
