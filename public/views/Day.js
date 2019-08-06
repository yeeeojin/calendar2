class Day {

  constructor (app) {
    this.app = app;
  }

  createDayTable() {
    // 일간 테이블 그리기
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const singletonDate = new SingletonDateModel();
    const curDate = new Date(); // 오늘
    const nowObj = singletonDate.getCurDate();
    const now = singletonDate.getDateFormat();
    // console.log(nowObj, now, nowObj.getDay(), nowObj.getDate());

    const table = document.createElement('div');
    table.setAttribute('id', 'day-table');

    // 일간 테이블 헤더
    const tableHeader = document.createElement('div');
    tableHeader.setAttribute('id', 'day-table-header');
    tableHeader.setAttribute('class', 'day-table-header');

    // row 생성
    // 시간 표시 영역(고정)
    const rowHeaderFix = document.createElement('div');
    rowHeaderFix.setAttribute('class', 'rowHeaderFix');
    rowHeaderFix.setAttribute('nav-id', 'fix-1');
    // rowHeaderFix.innerHTML = '고정영역';
    // 요일 표시 영역
    const row = document.createElement('div');
    row.setAttribute('class', 'row');
    row.setAttribute('nav-id', '1');
    // col 생성
    // 이번주 일~토까지 요일 Array
    const col = document.createElement('div');
    col.setAttribute('class', 'col');
    col.setAttribute('nav-id', '1-1');

    if (nowObj.getDay() === 0) {
      // 일요일
      col.setAttribute('class', 'col sun');
    } 
    if (nowObj.getDay() === 6) {
      // 토요일
      col.setAttribute('class', 'col sat');
    }
    // 이번주 요일 표시
    col.innerHTML = week[nowObj.getDay()] + ' ' + nowObj.getDate();
    row.appendChild(col);
    tableHeader.appendChild(rowHeaderFix);
    tableHeader.appendChild(row);

    // // 주간 테이블 바디
    const tableBody = document.createElement('div');
    tableBody.setAttribute('id', 'day-table-body');
    tableBody.setAttribute('class', 'day-table-body');

    // row 생성
    // 시간 표시 영역(고정)
    const rowBodyFix = document.createElement('div');
    rowBodyFix.setAttribute('id', 'rowBodyFix');
    rowBodyFix.setAttribute('class', 'rowBodyFix');
    for (let i = 0; i < 24; i++) {
      const row = document.createElement('div');
      row.setAttribute('class', 'row');
      row.setAttribute('nav-id', 'fix-' + (i + 2));
      if (i < 12) {
        // 오전
        if (i === 0) {
          row.innerHTML= '오전 ' + 12 + '시';
        } else {
          row.innerHTML= i + '시';
        }
      } else {
        // 오후
        if (i === 12) {
          row.innerHTML= '오후 ' + i + '시';
        } else {
          row.innerHTML= i -12 + '시';
        }
      }
      rowBodyFix.appendChild(row);
    }
    tableBody.appendChild(rowBodyFix);

    for (let i = 0; i < 24; i++) {
      // row 생성
      // 요일 표시 영역
      const row = document.createElement('div');
      row.setAttribute('class', 'row');
      row.setAttribute('nav-id', i);
      // col 생성
      const col = document.createElement('div');
      col.setAttribute('class', 'col');
      col.setAttribute('nav-id', i);
      // 오늘 날짜 표시
      if (curDate.getDate() === nowObj.getDate()) {
        const beforeClass = col.getAttribute('class');
        col.setAttribute('class', beforeClass + ' on');
      }
      // 날짜 인덱스 속성 추가
      if (i === 0) {
        col.setAttribute('id', 'day' + now.substr(8,2) + '-' + 24);
      } else {
        if (i < 10) {
          col.setAttribute('id', 'day' + now.substr(8,2) + '-0' + i);
        } else {
          col.setAttribute('id', 'day' + now.substr(8,2) + '-' + i);
        }
      }
      col.setAttribute('dayindex', i);
      // 달력 일정 표시
      const scheduleDiv = document.createElement('div');
      scheduleDiv.setAttribute('class', 'scheduleLine');
      const scheduleSpan = document.createElement('span');
      scheduleDiv.appendChild(scheduleSpan);
      col.appendChild(scheduleDiv);
      row.appendChild(col);

      // 타임라인
      if (i === curDate.getHours()) {
        const timelineDiv = document.createElement('div');
        timelineDiv.setAttribute('class', 'timeline');
        row.appendChild(timelineDiv);
      }
      tableBody.appendChild(row);
    }

    table.appendChild(tableHeader);
    table.appendChild(tableBody);
    this.app.appendChild(table);
    this.addSchedule();
  }

  initSchedule() {
    // 일별 달력 초기화
    const singletonDate = new SingletonDateModel();
    const curDate = new Date(); // 오늘
    const now = singletonDate.getDateFormat();
    for (let i = 0; i < 24; i++) {
      // row 생성
      // col 생성
      // 달력 일정 표시
      let divId;
      if (i === 0) {
        divId = 'day' + now.substr(8,2) + '-' + 24;
      } else {
        if (i < 10) {
          divId = 'day' + now.substr(8,2) + '-0' + i;
        } else {
          divId = 'day' + now.substr(8,2) + '-' + i;
        }
      }
      // console.log(document.getElementById(divId).childNodes[0]);
      const scheduleDiv = document.getElementById(divId).childNodes[0];
      scheduleDiv.setAttribute('class', 'scheduleLine');
      scheduleDiv.setAttribute('uuid', '');
      scheduleDiv.setAttribute('style', '');
      scheduleDiv.childNodes[0].setAttribute('uuid', '');
      scheduleDiv.childNodes[0].innerHTML = '';

      // 타임라인
      if (i === curDate.getHours()) {
        const timelineDiv = document.createElement('div');
        timelineDiv.setAttribute('class', 'timeline');
      }
    }
  }

  addSchedule () {
    // 등록된 스케쥴 달력에 추가 (일별)
    const singletonDate = new SingletonDateModel();
    const now = singletonDate.getDateFormat();
    const scheduleList = getLocalScheduleList();
    const continutyList = scheduleList[0];
    const unityList = scheduleList[1];

    const continutyDay = [];
    continutyList.map((continuty) => {
      // console.log('endDate Diff >>> ', diffDate(continuty.endDate, now, 'DATE'));
      if (diffDate(continuty.endDate, now, 'DATE') <= 0) {
        // console.log('startDate Diff >>> ', diffDate(continuty.startDate, now, 'DATE'));
        if (diffDate(continuty.startDate, now, 'DATE') >= 0) {
          // console.log('들어왔따', continuty);
          continutyDay.push(continuty);
        }
      }
    });
    // console.log('continutyDay >>> ', continutyDay);

    const unityDay = [];
    unityList.map((unity) => {
      if (now === unity.startDate) {
        unityDay.push(unity);
      }
    });
    // console.log('unityDay >>> ', unityDay);

    continutyDay.map((continuty) => {
      let startHour = Number((continuty.startTime).substr(0,2));
      let endHour = Number((continuty.endTime).substr(0,2));
      const singletonDate = new SingletonDateModel();
      const now = singletonDate.getDateFormat();

      // console.log('*************', startDate, now);
      // console.log('diffDate startDate>>', diffDate(continuty.startDate, now, 'DATE'));
      // console.log('diffDate endDate>>', diffDate(now, continuty.endDate, 'DATE'));

      if (now === continuty.startDate) {
        // 첫날
        // console.log('첫날');
        for (let j = startHour; j < 24; j++) {
          let hour = j;
          if (j === 0) {
            // 0 -> 24h
            hour = 24;
          } else {
            if (j < 10) {
              hour = '0' + j;
            }
          }
          const divId = 'day' + now.substr(8, 2) + '-' + hour;
          // console.log(j, divId, document.getElementById(divId));
          let scheduleDiv;
          scheduleDiv = document.getElementById(divId).childNodes[0];
          scheduleDiv.setAttribute('class', 'scheduleLine in');
          scheduleDiv.setAttribute('style', 'background-color: ' + continuty.randomColor + ';');
          scheduleDiv.setAttribute('uuid', continuty.uuid);
          scheduleDiv.childNodes[0].setAttribute('uuid', continuty.uuid);
          if (j === 24) {
            scheduleDiv.childNodes[0].innerHTML = '(' + continuty.startTime + ') ' + continuty.scheduleTitle;
          } else {
            if (j === startHour) {
              scheduleDiv.childNodes[0].innerHTML = '(' + continuty.startTime + ') ' + continuty.scheduleTitle;
              if (endHour === 24) {
                scheduleDiv.childNodes[0].innerHTML = '';
              }
            }
          }
        }
      } else {
        // else
        // console.log('else');
        if (diffDate(now, continuty.endDate, 'DATE') === 0) {
          // 마지막날
          // console.log('마지막날');
          for (let j = 0; j <= endHour; j++) {
            let hour = j;
            if (j === 0) {
              // 0 -> 24h
              hour = 24;
            } else {
              if (j < 10) {
                hour = '0' + j;
              }
            }
            const divId = 'day' + now.substr(8, 2) + '-' + hour;
            // console.log(j, divId, document.getElementById(divId));
            let scheduleDiv;
            scheduleDiv = document.getElementById(divId).childNodes[0];
            scheduleDiv.setAttribute('class', 'scheduleLine in');
            scheduleDiv.setAttribute('style', 'background-color: ' + continuty.randomColor + ';');
            scheduleDiv.setAttribute('uuid', continuty.uuid);
            scheduleDiv.childNodes[0].setAttribute('uuid', continuty.uuid);
          }
        } else {
          // 중간날
          // console.log('중간날');
          for (let j = 0; j <= 24; j++) {
            let hour = j;
            if (j === 0) {
              // 0 -> 24h
              hour = 24;
            } else {
              if (j < 10) {
                hour = '0' + j;
              }
            }
            const divId = 'day' + now.substr(8, 2) + '-' + hour;
            // console.log(j, divId, document.getElementById(divId));
            let scheduleDiv;
            scheduleDiv = document.getElementById(divId).childNodes[0];
            scheduleDiv.setAttribute('class', 'scheduleLine in');
            scheduleDiv.setAttribute('style', 'background-color: ' + continuty.randomColor + ';');
            scheduleDiv.setAttribute('uuid', continuty.uuid);
            scheduleDiv.childNodes[0].setAttribute('uuid', continuty.uuid);
          }
        }
      }
    });
    unityDay.map((unity) => {
      // 단일 일정
      // console.log('유니티 diffDate', diffDate(unity.startDate, unity.endDate, 'DATE'));
      const startDay = (unity.startDate).substr(8, 2);
      let startHour = Number((unity.startTime).substr(0,2));
      let endHour = Number((unity.endTime).substr(0,2));
      // console.log(startHour, endHour);
      if (endHour === 0) {
        endHour = 24;
      }
      for (let j = startHour; j <= endHour; j++) {
        let hour = j;
        if (j === 0) {
          // 0 -> 24h
          hour = 24;
        } else {
          if (j < 10) {
            hour = '0' + hour;
          }
        }
        const divId = 'day' + startDay + '-' + hour;
        let scheduleDiv;
        // console.log(j, startHour, divId);
        scheduleDiv = document.getElementById(divId).childNodes[0];
        scheduleDiv.setAttribute('class', 'scheduleLine in');
        scheduleDiv.setAttribute('style', 'background-color: ' + unity.randomColor + ';');
        scheduleDiv.setAttribute('uuid', unity.uuid);
        scheduleDiv.childNodes[0].setAttribute('uuid', unity.uuid);
        if (j === 24) {
          scheduleDiv.childNodes[0].innerHTML = '(' + unity.startTime + ') ' + unity.scheduleTitle;
        } else {
          if (j === startHour) {
            scheduleDiv.childNodes[0].innerHTML = '(' + unity.startTime + ') ' + unity.scheduleTitle;
            if (endHour === 24) {
              scheduleDiv.childNodes[0].innerHTML = '';
            }
          }
        }
      }
    });
  }
}
