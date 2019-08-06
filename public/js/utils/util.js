getDateFormat = (timeObj, format) => {
  const year = timeObj.getFullYear();
  let month = (timeObj.getMonth() + 1);
  let day = timeObj.getDate();
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

arrayTimeSort = (obj) => {
  // 일정 시간별로 정렬
  obj.sort((a, b) => {
    const x = new Date(a.startOriginDate).getTime();
    const y = new Date(b.startOriginDate).getTime();
    return x - y;
  })
}

getLocalStorage = (key) => {
  if (key === undefined) return null

  let getItem = localStorage.getItem(key)
  if (getItem === null) return null

  return JSON.parse(localStorage.getItem(key))
}

setLocalStorage = (key, value) => {
  if (key === undefined || value === undefined) return

  if (typeof value === 'object') {
    let _value = JSON.stringify(value)
    localStorage.setItem(key, _value)
  } else {
    localStorage.setItem(key, value)
  }
}

getNumber = (max) => {
  let num = ''
  for (let i = 0; i < 8; i++) {
    let ran = Math.floor(Math.random() * max) + 1
    num += ran
  }
  return num
}

getFirstDay = () => {
  // 이달의 시작일
  const now = new SingletonDateModel().getCurDate();
  const year = now.getFullYear();
  const month = now.getMonth();
  return new Date(year, month).getDay();
}

getLastDay = () => {
  // 이달의 마지막일
  const now = new SingletonDateModel().getCurDate();
  const year = now.getFullYear();
  const month = now.getMonth();
  return new Date(year, month + 1, 0).getDate();
}

getThisWeekFirstDate = (date) => {
  // console.log(typeof date, date);
  if ((typeof date) !== 'object') {
    date = new Date(date);
  }
  // console.log('2', typeof date, date);
  let sunday;
  for (var i = 0; i < 7; i++) {
    const now = date;
    // console.log(now.getDate());
    const dayIndex = new Date(now.setDate(now.getDate() - i)).getDay();
    // console.log('dayIndex', dayIndex);
    if (dayIndex === 0) {
      sunday = new Date(now.setDate(now.getDate())).getDate();
      break;
    }
  }
  let sunDate;
  sunDate = date.getFullYear();
  sunDate += '-' + (date.getMonth() + 1);
  sunDate += '-' + sunday;
  // console.log('이번주 일요일은 ' + sunDate);
  return sunDate;
}


// 일~토까지 요일 찾기
weekDayArr = () => {
  // date 타입은 object
  const singletonDate = new SingletonDateModel();
  let date = singletonDate.getCurDate();
  // console.log(typeof date, date);
  if ((typeof date) !== 'object') {
    date = new Date(date);
  }
  let sunDate;
  sunDate = new Date(getThisWeekFirstDate(getDateFormat(date)));
  const weekArr = [];
  for (let i = 0; i < 7; i++) {
    if (i === 0) {
      weekArr.push({
        day: (getDateFormat(sunDate)).substr(8, 2),
        date: new Date(getThisWeekFirstDate(getDateFormat(date)))
      });
      // console.log((getDateFormat(sunDate)).substr(8, 2));
    } else {
      const nextDate = new Date(sunDate.setDate(sunDate.getDate() + 1));
      weekArr.push({
        day: (getDateFormat(sunDate)).substr(8, 2),
        date: nextDate
      });
      // console.log((getDateFormat(nextDate)).substr(8, 2));
    }
  }
  // console.log(weekArr);
  return weekArr;
}

// Date 차이 구하기
diffDate = (sDate, eDate, type) => {
  // console.log('diffDate', sDate, eDate);
  if ((typeof sDate) !== 'object') {
    sDate = new Date(sDate);
  }
  if ((typeof eDate) !== 'object') {
    eDate = new Date(eDate);
  }
  if (type === 'DATE') {
    // 날짜 차이 구하기
    const diff = (eDate.getTime() - sDate.getTime()) / (1000 * 60 * 60 * 24);
    if (diff < 0) {
      return -1;
    } else {
      return Math.floor(diff);
    }
  } else if (type === 'TIME') {
    // 시간 차이 구하기
    const diff = (eDate.getTime() - sDate.getTime()) / (1000 * 60 * 60);
    if (diff < 0) {
      return -1;
    } else {
      return  Math.floor(diff);
    }
  }
}

// 로컬 스토리지에 저장되어 있는 스케쥴리스트 불러오기
getLocalScheduleList = () => {
  const continutyList = [];
  const unityList = [];
  const scheduleList = getLocalStorage('scheduleList') ? getLocalStorage('scheduleList') : [];
  scheduleList.map((schedule) => {
    if (schedule.continuty) {
      continutyList.push(schedule);
    } else {
      unityList.push(schedule);
    }
  });
  // console.log(continutyList, unityList);
  arrayTimeSort(continutyList);
  arrayTimeSort(unityList);

  return [continutyList, unityList];
}
