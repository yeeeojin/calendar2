class Month {

  constructor (app) {
    this.app = app;
  }

  createMonthTable() {
    // 월간 테이블 그리기
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const curDate = new Date(); // 오늘
    const singletonDate = new SingletonDateModel();
    const now = singletonDate.getCurDate();

    const table = document.createElement('div');
    table.setAttribute('id', 'month-table');

    // 월간 테이블 헤더
    const tableHeader = document.createElement('div');
    tableHeader.setAttribute('id', 'month-table-header');
    tableHeader.setAttribute('class', 'month-table-header');
    // row 생성
    const row = document.createElement('div');
    row.setAttribute('class', 'row');
    row.setAttribute('nav-id', '1');
    // col 생성
    for (let j = 0; j < 7; j++) {
      const col = document.createElement('div');
      col.setAttribute('class', 'col');
      col.setAttribute('nav-id', '1-' + (j + 1));
      if (j === 0) {
        // 일요일
        col.setAttribute('class', 'col sun');
      } 
      if (j === 6) {
        // 토요일
        col.setAttribute('class', 'col sat');
      }
      col.innerHTML = week[j] + '요일';
      row.appendChild(col);
    }
    tableHeader.appendChild(row);

    // 월간 테이블 바디
    const tableBody = document.createElement('div');
    tableBody.setAttribute('id', 'month-table-body');
    tableBody.setAttribute('class', 'month-table-body');

    let start = 1;
    for (let i = 0; i < 6; i++) {
      // row 생성
      const row = document.createElement('div');
      row.setAttribute('class', 'row');
      row.setAttribute('nav-id', (i + 2));
      for (let j = 0; j < 7; j++) {
        // col 생성
        const col = document.createElement('div');
        col.setAttribute('class', 'col');
        col.setAttribute('nav-id', (i + 2) + '-' + (j + 1));
        if (j === 0) {
          // 일요일
          col.setAttribute('class', 'col sun');
        } 
        if (j === 6) {
          // 토요일
          col.setAttribute('class', 'col sat');
        }
        const dayDiv = document.createElement('div');
        dayDiv.setAttribute('class', 'dayLine');
        if (start <= this.getLastDay()) {
          // 이달의 마지막일까지만 표시
          if (i === 0) {
            if (j >= this.getFirstDay()) {
              // 이달의 시작일 표시 시작
              const day = document.createElement('span');
              day.innerHTML = start + '일';
              dayDiv.appendChild(day);
              if (curDate.getMonth() === now.getMonth() && start === curDate.getDate()) {
                // 오늘 날짜 표시
                const beforeClass = col.getAttribute('class');
                col.setAttribute('class', beforeClass + ' on');
              }
              // 날짜 인덱스 속성 추가
              col.setAttribute('id', 'day0' + start);
              col.setAttribute('dayindex', start);
              col.appendChild(dayDiv);

              for (let i = 0; i < 4; i++) {
                // 달력 하루에 일정 최대 4개까지 표시
                const scheduleDiv = document.createElement('div');
                scheduleDiv.setAttribute('class', 'scheduleLine');
                scheduleDiv.setAttribute('scheduleindex', i);
                const scheduleSpan = document.createElement('span');
                scheduleDiv.appendChild(scheduleSpan);
                col.appendChild(scheduleDiv);
              }
              start++;
            }
          } else {
            const day = document.createElement('span');
            day.innerHTML = start + '일';
            dayDiv.appendChild(day);
            if (curDate.getMonth() === now.getMonth() && start === curDate.getDate()) {
              // 오늘 날짜 표시
              const beforeClass = col.getAttribute('class');
              col.setAttribute('class', beforeClass + ' on');
            }
            // 날짜 인덱스 속성 추가
            if (start < 10) {
              col.setAttribute('id', 'day0' + start);
            } else {
              col.setAttribute('id', 'day' + start);
            }
            col.setAttribute('dayindex', start);
            col.appendChild(dayDiv);

            for (let i = 0; i < 4; i++) {
              // 달력 하루에 일정 최대 4개까지 표시
              const scheduleDiv = document.createElement('div');
              scheduleDiv.setAttribute('class', 'scheduleLine');
              scheduleDiv.setAttribute('scheduleindex', i);
              const scheduleSpan = document.createElement('span');
              scheduleDiv.appendChild(scheduleSpan);
              col.appendChild(scheduleDiv);
            }
            start++;
          }
        }
        row.appendChild(col);
      }
      tableBody.appendChild(row);
    }

    table.appendChild(tableHeader);
    table.appendChild(tableBody);
    this.app.appendChild(table);
    this.addSchedule();
  }

  getFirstDay() {
    // 이달의 시작일
    const now = new SingletonDateModel().getCurDate();
    const year = now.getFullYear();
    const month = now.getMonth();
    return new Date(year, month).getDay();
  }

  getLastDay() {
    // 이달의 마지막일
    const now = new SingletonDateModel().getCurDate();
    const year = now.getFullYear();
    const month = now.getMonth();
    return new Date(year, month + 1, 0).getDate();
  }

  initSchedule() {
    // 달력 일정 초기화
    let start = 1;
    for (let i = 0; i < 6; i++) {
      // row 생성
      for (let j = 0; j < 7; j++) {
        // col 생성
        if (start <= this.getLastDay()) {
          // 이달의 마지막일까지만 표시
          if (i === 0) {
            if (j >= this.getFirstDay()) {
              // 이달의 시작일 표시 시작
              for (let i = 0; i < 4; i++) {
                // 달력 하루에 일정 최대 4개까지 표시
                let divId;
                if (start < 10) {
                  divId = 'day0' + start;
                } else {
                  divId = 'day' + start;
                }
                const scheduleDiv = document.getElementById(divId).childNodes[i+1];
                scheduleDiv.setAttribute('class', 'scheduleLine');
                scheduleDiv.setAttribute('uuid', '');
                scheduleDiv.setAttribute('style', '');
                scheduleDiv.childNodes[0].setAttribute('uuid', '');
                scheduleDiv.childNodes[0].innerHTML = '';
              }
              start++;
            }
          } else {
            for (let i = 0; i < 4; i++) {
              // 달력 하루에 일정 최대 4개까지 표시
              let divId;
              if (start < 10) {
                divId = 'day0' + start;
              } else {
                divId = 'day' + start;
              }
              const scheduleDiv = document.getElementById(divId).childNodes[i+1];
              scheduleDiv.setAttribute('class', 'scheduleLine');
              scheduleDiv.setAttribute('uuid', '');
              scheduleDiv.setAttribute('style', '');
              scheduleDiv.childNodes[0].setAttribute('uuid', '');
              scheduleDiv.childNodes[0].innerHTML = '';
            }
            start++;
          }
        }
      }
    }
  }

  addSchedule() {
    // 등록된 스케쥴 달력에 추가
    const singletonDate = new SingletonDateModel();
    const scheduleList = getLocalScheduleList();
    const continutyList = scheduleList[0];
    const unityList = scheduleList[1];
    const continutyMonth = [];
    const unityMonth = [];
    const thisMonth = singletonDate.getDateFormat('YYYY-MM'); // YYYY-MM
    // console.log('continutyList unityList >>> ', continutyList, unityList);
    

    continutyList.map((continuty) => {
      // 연속 일정
      const startMonth = (continuty.startDate).substring(0, 7);
      const endMonth = (continuty.endDate).substring(0, 7);
      // console.log('continutyList i', continuty, thisMonth, startMonth, endMonth);

      if (thisMonth === startMonth) {
        continutyMonth.push(continuty);
      } else {
        if (thisMonth === endMonth) {
          continutyMonth.push(continuty);
        }
      }
    });
    unityList.map((unity) => {
      // 단일 일정
      const startMonth = (unity.startDate).substring(0, 7);
      const endMonth = (unity.endDate).substring(0, 7);
      // console.log('unityList i', unity, thisMonth, startMonth, endMonth);

      if (thisMonth === startMonth) {
        unityMonth.push(unity);
      } else {
        if (thisMonth === endMonth) {
          unityMonth.push(unity);
        }
      }
    });
    // console.log('정렬 완료>>>', continutyMonth, unityMonth);

    continutyMonth.map((continuty, i) => {
      // 연속 일정
      // 달력 하루에 일정 최대 4개까지 표시
      if (i === 4) {
        return
      }
      const startMonth = (continuty.startDate).substring(0, 7);
      const endMonth = (continuty.endDate).substring(0, 7);
      const startDay = (continuty.startDate).substr(8, 2);
      const endDay = (continuty.endDate).substr(8, 2);
      if (thisMonth !== startMonth) {
        if (thisMonth === endMonth) {
          for (let j = 0; j < Number(endDay); j++) {
            let divId;
            if (i < 10) {
              divId = 'day0' + (j + 1);
            } else {
              divId = 'day' + (j + 1);
            }
            let scheduleDiv;
            if (document.getElementById(divId).childNodes[1].getAttribute('class') === 'scheduleLine') {
              scheduleDiv = document.getElementById(divId).childNodes[1]
            } else if (document.getElementById(divId).childNodes[2].getAttribute('class') === 'scheduleLine') {
              scheduleDiv = document.getElementById(divId).childNodes[2]
            } else if (document.getElementById(divId).childNodes[3].getAttribute('class') === 'scheduleLine') {
              scheduleDiv = document.getElementById(divId).childNodes[3]
            } else if (document.getElementById(divId).childNodes[4].getAttribute('class') === 'scheduleLine') {
              scheduleDiv = document.getElementById(divId).childNodes[4]
            } else {
              scheduleDiv = document.getElementById(divId).childNodes[i+1];
            }
            scheduleDiv.setAttribute('class', 'scheduleLine in');
            scheduleDiv.setAttribute('uuid', continuty.uuid);
            scheduleDiv.setAttribute('style', 'background-color: ' + continuty.randomColor + ';');
            scheduleDiv.childNodes[0].setAttribute('uuid', continuty.uuid);
            if (j === Number(startDay)) {
              scheduleDiv.childNodes[0].innerHTML = '(' + continuty.startTime + ') ' + continuty.scheduleTitle;
            }
          }
        }
      } else {
        if (thisMonth === endMonth) {
          for (let j = Number(startDay); j <= Number(endDay); j++) {
            let divId;
            if (j < 10) {
              divId = 'day0' + j;
            } else {
              divId = 'day' + j;
            }
            let scheduleDiv;
            if (document.getElementById(divId).childNodes[1].getAttribute('class') === 'scheduleLine') {
              scheduleDiv = document.getElementById(divId).childNodes[1]
            } else if (document.getElementById(divId).childNodes[2].getAttribute('class') === 'scheduleLine') {
              scheduleDiv = document.getElementById(divId).childNodes[2]
            } else if (document.getElementById(divId).childNodes[3].getAttribute('class') === 'scheduleLine') {
              scheduleDiv = document.getElementById(divId).childNodes[3]
            } else if (document.getElementById(divId).childNodes[4].getAttribute('class') === 'scheduleLine') {
              scheduleDiv = document.getElementById(divId).childNodes[4]
            } else {
              scheduleDiv = document.getElementById(divId).childNodes[i+1];
            }
            // console.log(scheduleDiv);
            scheduleDiv.setAttribute('class', 'scheduleLine in');
            scheduleDiv.setAttribute('uuid', continuty.uuid);
            scheduleDiv.setAttribute('style', 'background-color: ' + continuty.randomColor + ';');
            scheduleDiv.childNodes[0].setAttribute('uuid', continuty.uuid);
            if (j === Number(startDay)) {
              scheduleDiv.childNodes[0].innerHTML = '(' + continuty.startTime + ') ' + continuty.scheduleTitle;
            }
          }
        } else {
          for (let j = Number(startDay); j <= Number(getLastDay()); j++) {
            let divId;
            if (j < 10) {
              divId = 'day0' + j;
            } else {
              divId = 'day' + j;
            }
            let scheduleDiv;
            if (document.getElementById(divId).childNodes[1].getAttribute('class') === 'scheduleLine') {
              scheduleDiv = document.getElementById(divId).childNodes[1]
            } else if (document.getElementById(divId).childNodes[2].getAttribute('class') === 'scheduleLine') {
              scheduleDiv = document.getElementById(divId).childNodes[2]
            } else if (document.getElementById(divId).childNodes[3].getAttribute('class') === 'scheduleLine') {
              scheduleDiv = document.getElementById(divId).childNodes[3]
            } else if (document.getElementById(divId).childNodes[4].getAttribute('class') === 'scheduleLine') {
              scheduleDiv = document.getElementById(divId).childNodes[4]
            } else {
              scheduleDiv = document.getElementById(divId).childNodes[i+1];
            }
            // console.log(scheduleDiv);
            scheduleDiv.setAttribute('class', 'scheduleLine in');
            scheduleDiv.setAttribute('uuid', continuty.uuid);
            scheduleDiv.setAttribute('style', 'background-color: ' + continuty.randomColor + ';');
            scheduleDiv.childNodes[0].setAttribute('uuid', continuty.uuid);
            if (j === Number(startDay)) {
              scheduleDiv.childNodes[0].innerHTML = '(' + continuty.startTime + ') ' + continuty.scheduleTitle;
            }
          }
        }
      }
    });

    unityMonth.map((unity, i) => {
      // 단일 일정
      // 달력 하루에 일정 최대 4개까지 표시
      if (i === 4) {
        return
      }
      const startDay = (unity.startDate).substr(8, 2);
      const divId = 'day' + startDay;
      let scheduleDiv;
      if (document.getElementById(divId).childNodes[1].getAttribute('class') === 'scheduleLine') {
        scheduleDiv = document.getElementById(divId).childNodes[1]
      } else if (document.getElementById(divId).childNodes[2].getAttribute('class') === 'scheduleLine') {
        scheduleDiv = document.getElementById(divId).childNodes[2]
      } else if (document.getElementById(divId).childNodes[3].getAttribute('class') === 'scheduleLine') {
        scheduleDiv = document.getElementById(divId).childNodes[3]
      } else if (document.getElementById(divId).childNodes[4].getAttribute('class') === 'scheduleLine') {
        scheduleDiv = document.getElementById(divId).childNodes[4]
      } else {
        scheduleDiv = document.getElementById(divId).childNodes[i+1];
      }
      // console.log(startDay, divId, 'i: ' + i, scheduleDiv);
      scheduleDiv.setAttribute('class', 'scheduleLine in');
      scheduleDiv.setAttribute('uuid', unity.uuid);
      scheduleDiv.childNodes[0].setAttribute('uuid', unity.uuid);
      scheduleDiv.setAttribute('style', 'background-color: ' + unity.randomColor + ';');
      scheduleDiv.childNodes[0].innerHTML = '(' + unity.startTime + ') ' + unity.scheduleTitle;
    });
  }
}
