/**
 * 버튼 클릭 이벤트
 */
let selectStartDate;
let selectEndDate;
let selectStartTime;
let selectEndTime;
let clickedSchedule = [];

// 월간
monthTable = () => {
  if (document.getElementById('month-table')) {
    document.getElementById('month-table').remove();
  }
  if (document.getElementById('week-table')) {
    document.getElementById('week-table').remove();
  }
  if (document.getElementById('day-table')) {
    document.getElementById('day-table').remove();
  }
  
  document.getElementById('btn1').setAttribute('class', '');
  document.getElementById('btn2').setAttribute('class', '');
  document.getElementById('btn3').setAttribute('class', 'on');
  todayTable();
}

// 주간
weekTable = () => {
  if (document.getElementById('month-table')) {
    document.getElementById('month-table').remove();
  }
  if (document.getElementById('week-table')) {
    document.getElementById('week-table').remove();
  }
  if (document.getElementById('day-table')) {
    document.getElementById('day-table').remove();
  }

  document.getElementById('btn1').setAttribute('class', '');
  document.getElementById('btn2').setAttribute('class', 'on');
  document.getElementById('btn3').setAttribute('class', '');
  todayTable();
}

// 일간
dayTable = () => {
  if (document.getElementById('month-table')) {
    document.getElementById('month-table').remove();
  }
  if (document.getElementById('week-table')) {
    document.getElementById('week-table').remove();
  }
  if (document.getElementById('day-table')) {
    document.getElementById('day-table').remove();
  }

  document.getElementById('btn1').setAttribute('class', 'on');
  document.getElementById('btn2').setAttribute('class', '');
  document.getElementById('btn3').setAttribute('class', '');
  todayTable();
}

// 이전
beforeTable = () => {
  const dayClass = document.getElementById('btn1').getAttribute('class');
  const weekClass = document.getElementById('btn2').getAttribute('class');
  const monthClass = document.getElementById('btn3').getAttribute('class');
  // console.log('beforeTable', dayClass, weekClass, monthClass);
  if (dayClass === 'on') {
    // 일간달력 prev 버튼
    // Singleton 패턴 날짜
    const singletonDate = new SingletonDateModel();
    let curDate = singletonDate.getCurDate();
    curDate = new Date(curDate.setDate((curDate.getDate() - 1)));
    singletonDate.setCurDate(new Date(curDate));

    document.getElementById('menuDate').innerHTML = singletonDate.getDateFormat();

    if (document.getElementById('day-table')) {
      document.getElementById('day-table').remove();
    }
    const day = new Day(app);
    day.createDayTable();
  }
  if (weekClass === 'on') {
    // 주간달력 prev 버튼
    // Singleton 패턴 날짜
    const singletonDate = new SingletonDateModel();
    let curDate = singletonDate.getCurDate();
    curDate = new Date(curDate.setDate((curDate.getDate() - 7)));
    singletonDate.setCurDate(new Date(curDate));

    document.getElementById('menuDate').innerHTML = singletonDate.getDateFormat();

    if (document.getElementById('week-table')) {
      document.getElementById('week-table').remove();
    }
    const week = new Week(app);
    week.createWeekTable();
  }
  if (monthClass === 'on') {
    // 월간달력 prev 버튼
    // Singleton 패턴 날짜
    const singletonDate = new SingletonDateModel();
    let curDate = singletonDate.getCurDate();
    curDate = curDate.setMonth(curDate.getMonth() - 1);
    singletonDate.setCurDate(new Date(curDate));
  
    document.getElementById('menuDate').innerHTML = singletonDate.getDateFormat();
  
    if (document.getElementById('month-table')) {
      document.getElementById('month-table').remove();
    }
    const month = new Month(app);
    month.createMonthTable();
  }
}

// 이후
afterTable = () => {
  const dayClass = document.getElementById('btn1').getAttribute('class');
  const weekClass = document.getElementById('btn2').getAttribute('class');
  const monthClass = document.getElementById('btn3').getAttribute('class');
  // console.log('afterTable', dayClass, weekClass, monthClass);
  if (dayClass === 'on') {
    // 일간달력 next 버튼
    // Singleton 패턴 날짜
    const singletonDate = new SingletonDateModel();
    let curDate = singletonDate.getCurDate();
    curDate = new Date(curDate.setDate((curDate.getDate() + 1)));
    singletonDate.setCurDate(new Date(curDate));

    document.getElementById('menuDate').innerHTML = singletonDate.getDateFormat();

    if (document.getElementById('day-table')) {
      document.getElementById('day-table').remove();
    }
    const day = new Day(app);
    day.createDayTable();
  }
  if (weekClass === 'on') {
    // 주간달력 next 버튼
    // Singleton 패턴 날짜
    const singletonDate = new SingletonDateModel();
    let curDate = singletonDate.getCurDate();
    curDate = new Date(curDate.setDate((curDate.getDate() + 7)));
    singletonDate.setCurDate(new Date(curDate));

    document.getElementById('menuDate').innerHTML = singletonDate.getDateFormat();

    if (document.getElementById('week-table')) {
      document.getElementById('week-table').remove();
    }
    const week = new Week(app);
    week.createWeekTable();
  }
  if (monthClass === 'on') {
    // 월간달력 next 버튼
    // Singleton 패턴 날짜
    const singletonDate = new SingletonDateModel();
    let curDate = singletonDate.getCurDate();
    curDate = curDate.setMonth(curDate.getMonth() + 1);
    singletonDate.setCurDate(new Date(curDate));
  
    document.getElementById('menuDate').innerHTML = singletonDate.getDateFormat();
  
    if (document.getElementById('month-table')) {
      document.getElementById('month-table').remove();
    }
    const month = new Month(app);
    month.createMonthTable();
  }
}

// 오늘
todayTable = () => {
  const dayClass = document.getElementById('btn1').getAttribute('class');
  const weekClass = document.getElementById('btn2').getAttribute('class');
  const monthClass = document.getElementById('btn3').getAttribute('class');
  // console.log('todayTable', dayClass, weekClass, monthClass);
  if (dayClass === 'on') {
    // 일간달력 today 버튼
    // Singleton 패턴 날짜
    const singletonDate = new SingletonDateModel();
    singletonDate.setCurDate(new Date());

    document.getElementById('menuDate').innerHTML = singletonDate.getDateFormat();

    if (document.getElementById('day-table')) {
      document.getElementById('day-table').remove();
    }
    const day = new Day(app);
    day.createDayTable();
  }
  if (weekClass === 'on') {
    // 주간달력 today 버튼
    // Singleton 패턴 날짜
    const singletonDate = new SingletonDateModel();
    singletonDate.setCurDate(new Date());

    document.getElementById('menuDate').innerHTML = singletonDate.getDateFormat();

    if (document.getElementById('week-table')) {
      document.getElementById('week-table').remove();
    }
    const week = new Week(app);
    week.createWeekTable();
  }
  if (monthClass === 'on') {
    // 월간달력 today 버튼
    // Singleton 패턴 날짜
    const singletonDate = new SingletonDateModel();
    singletonDate.setCurDate(new Date());

    document.getElementById('menuDate').innerHTML = singletonDate.getDateFormat();

    if (document.getElementById('month-table')) {
      document.getElementById('month-table').remove();
    }
    const month = new Month(app);
    month.createMonthTable();
  }
}

// 일정 추가
popup = () => {
  // 팝업 show
  popupInit();

  // 수정/삭제 버튼 hide, 저장 버튼 show
  document.getElementById('popupHeaderText').innerHTML = '일정추가';
  document.getElementById('popup').setAttribute('style', 'display: block;');
  document.getElementById('footerNew').setAttribute('style', 'display: block;');
  document.getElementById('footerExist').setAttribute('style', 'display: none;');
  // console.log(selectStartDate);
}

// 팝업 - 닫기(X)
popupHide = () => {
  popupInit();
  document.getElementById('popup').setAttribute('style', 'display: none;');
  const dayClass = document.getElementById('btn1').getAttribute('class');
  const weekClass = document.getElementById('btn2').getAttribute('class');
  const monthClass = document.getElementById('btn3').getAttribute('class');
  // console.log('popupHide', dayClass, weekClass, monthClass);
   // 달력 새로 불러오기
  if (dayClass === 'on') {
    // 일간달력 X 버튼
    const day = new Day();
    day.initSchedule();
    day.addSchedule();
  }
  if (weekClass === 'on') {
    const week = new Week();
    week.initSchedule();
    week.addSchedule();
  }
  if (monthClass === 'on') {
    const month = new Month();
    month.initSchedule();
    month.addSchedule();
  }
}

// 팝업 초기화
popupInit = () => {
  // 입력창 초기화
  let now = new Date();
  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 1);
  endDate.setMinutes(endDate.getMinutes() - 1);
  document.getElementById('scheduleTitle').value = '';
  document.getElementById('scheduleMemo').value = '';
  document.getElementById('scheduleStartDate').valueAsDate = now;
  document.getElementById('scheduleEndDate').valueAsDate = endDate;
  selectStartDate = getDateFormat(now);
  selectEndDate = getDateFormat(endDate);
  now = now.toString();
  endDate = endDate.toString();
  document.getElementById('selectStartTime').value = now.substring(16, 21);
  document.getElementById('selectEndTime').value = endDate.substring(16, 21);
  selectStartTime = now.substring(16, 21);
  selectEndTime = endDate.substring(16, 21);
  clickedSchedule = [];
}

// 팝업 - 등록한 일정 show
popupShow = (schedule) => {
  // 등록한 일정 값 설정
  // console.log('popupShow()', schedule);
  document.getElementById('popupHeaderText').innerHTML = '일정수정';
  clickedSchedule = schedule;
  let start = new Date(schedule.startOriginDate);
  let end = new Date(schedule.endOriginDate);
  const formatStart = getDateFormat(start);
  const formatEnd = getDateFormat(end);
  start = start.toString();
  end = end.toString();
  document.getElementById('scheduleTitle').value = schedule.scheduleTitle;
  document.getElementById('scheduleMemo').value = schedule.scheduleMemo;
  document.getElementById('scheduleStartDate').valueAsDate = new Date(formatStart);
  document.getElementById('scheduleEndDate').valueAsDate = new Date(formatEnd);
  document.getElementById('selectStartTime').value = schedule.startTime;
  document.getElementById('selectEndTime').value = schedule.endTime;
  selectStartDate = formatStart;
  selectEndDate = formatEnd;
  selectStartTime = start.slice(16, 21);
  selectEndTime = end.slice(16, 21);

  // 수정/삭제 버튼 show, 저장 버튼 hide
  document.getElementById('popup').setAttribute('style', 'display: block;');
  document.getElementById('footerNew').setAttribute('style', 'display: none;');
  document.getElementById('footerExist').setAttribute('style', 'display: block;');
}

// 팝업 - 저장
popupSave = () => {
  const scheduleTitle = document.getElementById('scheduleTitle').value;
  const scheduleMemo = document.getElementById('scheduleMemo').value;

  // 일정 저장
  if (!scheduleTitle) {
    alert('제목을 입력해주세요');
    return
  }
  if (!selectStartDate || !selectStartTime) {
    alert('시작일시를 입력해주세요');
    return
  }
  if (!selectEndDate || !selectEndTime) {
    alert('종료일시를 입력해주세요');
    return
  }
  // console.log('selectStartDate, selectEndDate', selectStartDate, selectEndDate);
  let startOriginDate = new Date(selectStartDate)
  startOriginDate.setHours(selectStartTime.substring(0, 2));
  startOriginDate.setMinutes(selectStartTime.substring(3, 5));

  let endOriginDate = new Date(selectEndDate)
  endOriginDate.setHours(selectEndTime.substring(0, 2));
  endOriginDate.setMinutes(selectEndTime.substring(3, 5));
  // console.log(startOriginDate, endOriginDate);

  const diffDay = diffDate(startOriginDate, endOriginDate, 'DATE');
  if (diffDay < 0) {
    alert('종료일시는 시작일시와 동일하거나 그 이후로만 설정 가능합니다.');
    return
  }
  const diffTime = diffDate(startOriginDate, endOriginDate, 'TIME');
  // console.log('diffDay, diffTime', diffDay, diffTime);

  /**
   *  scheduleList: [
        {
          uuid, // scheduleList 값 id (난수)
          startDate, // 시작일
          startTime, // 시작시간
          endDate, // 종료일
          endTime, // 종료시간
          startOriginDate, // new Date(시작일)
          endOriginDate, // new Date(종료일)
          scheduleTitle, // 일정 제목
          scheduleMemo, // 일정 메모
        }
      ]
   */
  const randomColor = '#'+(0xFFFFFFFF-Math.random()*0xFFFFFFFF).toString(16).substr(0, 6);
  const scheduleList = getLocalStorage('scheduleList') ? getLocalStorage('scheduleList') : [];
  scheduleList.push({
    uuid: getNumber(6),
    continuty: (diffTime >= 24) ? true : false,
    scheduleTitle,
    scheduleMemo,
    startOriginDate,
    endOriginDate,
    startDate: selectStartDate,
    endDate: selectEndDate,
    startTime: selectStartTime,
    endTime: selectEndTime,
    randomColor
  })
  setLocalStorage('scheduleList', scheduleList);

  // console.log('제목 >>> ', scheduleTitle);
  // console.log('시작일시 >>> ', selectStartDate);
  // console.log('종료일시 >>> ', selectEndDate);
  // console.log('시작일시 시간 >>> ', selectStartTime);
  // console.log('종료일시 시간 >>> ', selectEndTime);
  // console.log('메모 >>> ', scheduleMemo);

  // 팝업 닫기
  popupHide();
}

// 팝업 - 수정
popupUpdate = () => {
  // 일정 수정
  console.log('일정 수정', clickedSchedule);
  const scheduleList = getLocalStorage('scheduleList') ? getLocalStorage('scheduleList') : [];
  let popIndex = scheduleList.findIndex((schedule) => schedule.uuid === clickedSchedule.uuid);
  scheduleList.splice(popIndex, 1);
  setLocalStorage('scheduleList', scheduleList);
  console.log('일정 수정 완료', scheduleList);
  popupSave();
}

// 팝업 - 삭제
popupDelete = () => {
  // 일정 삭제
  console.log('일정 삭제', clickedSchedule);
  const scheduleList = getLocalStorage('scheduleList') ? getLocalStorage('scheduleList') : [];
  let popIndex = scheduleList.findIndex((schedule) => schedule.uuid === clickedSchedule.uuid);
  scheduleList.splice(popIndex, 1);
  setLocalStorage('scheduleList', scheduleList);
  console.log('일정 삭제 완료', scheduleList);
  popupHide();
}

// 팝업 - 시작일시 날짜
setStartDate = () => {
  // 시작일시 날짜
  selectStartDate = document.getElementById('scheduleStartDate').value;
  console.log('시작일시 날짜', selectStartDate);
}

// 팝업 - 종료일시 날짜
setEndDate = () => {
  // 종료일시 날짜
  selectEndDate = document.getElementById('scheduleEndDate').value;
  console.log('종료일시 날짜', selectEndDate);
}

// 팝업 - 시작일시 시간
setStartTime = () => {
  // 시작일시 시간
  selectStartTime = document.getElementById('selectStartTime').value;
  console.log('시작일시 시간', selectStartTime);
}

// 팝업 - 종료일시 시간
setEndTime = () => {
  // 종료일시 시간
  selectEndTime = document.getElementById('selectEndTime').value;
  console.log('종료일시 시간', selectEndTime);
}
