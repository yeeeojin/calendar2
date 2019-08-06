let instance;
class SingletonDateModel {

  constructor () {
    if (instance) { return instance; }

    this.curDate = new Date();
    instance = this;
  }

  getCurDate () {
    return this.curDate;
  }

  setCurDate (date) {
    this.curDate = date;
  }

  getDateFormat (format) {
    const year = this.curDate.getFullYear();
    let month = this.curDate.getMonth() + 1;
    let day = this.curDate.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    if (format === 'YYYY-MM') {
      return year + '-' + month;
    } else {
      return year + '-' + month + '-' + day;
    }
  }
}
