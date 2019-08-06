class Week {

  constructor (app) {
    this.app = app;
  }

  createWeekTable() {
    // 주간 테이블 그리기
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const curDate = new Date(); // 오늘
    const singletonDate = new SingletonDateModel();
    const now = singletonDate.getCurDate();

    const table = document.createElement('div');
    table.setAttribute('id', 'week-table');

    // 주간 테이블 헤더
    const tableHeader = document.createElement('div');
    tableHeader.setAttribute('id', 'week-table-header');
    tableHeader.setAttribute('class', 'week-table-header');
    // row 생성
    // 시간 표시 영역(고정)
    const rowHeaderFix = document.createElement('div');
    rowHeaderFix.setAttribute('class', 'rowHeaderFix');
    rowHeaderFix.setAttribute('nav-id', 'fix-1');
    // 요일 표시 영역
    const row = document.createElement('div');
    row.setAttribute('class', 'row');
    row.setAttribute('nav-id', '1');
    // col 생성
    // 이번주 일~토까지 요일 Array
    const weekArr = weekDayArr();
    // console.log(weekArr);
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
      // 이번주 요일 표시
      col.innerHTML = week[j] + ' ' + weekArr[j].day;
      row.appendChild(col);
    }
    tableHeader.appendChild(rowHeaderFix);
    tableHeader.appendChild(row);

    // 주간 테이블 바디
    const tableBody = document.createElement('div');
    tableBody.setAttribute('id', 'week-table-body');
    tableBody.setAttribute('class', 'week-table-body');

    // row 생성
    // 시간 표시 영역(고정)
    const rowBodyFix = document.createElement('div');
    rowBodyFix.setAttribute('id', 'rowBodyFix');
    rowBodyFix.setAttribute('class', 'rowBodyFix');
    for (let i = 0; i <= 24; i++) {
      const row = document.createElement('div');
      row.setAttribute('class', 'row');
      row.setAttribute('nav-id', 'fix-' + (i + 2));
      if (i > 0) {
        if (i < 13) {
          // 오전
          if (i === 1) {
            row.innerHTML= '오전 ' + 12 + '시';
          } else {
            row.innerHTML= (i - 1) + '시';
          }
        } else {
          // 오후
          if (i === 13) {
            row.innerHTML= '오후 ' + (i - 1) + '시';
          } else {
            row.innerHTML= i -13 + '시';
          }
        }
        // 시간별 일정
        row.setAttribute('class', 'row');
      } else {
        // 오늘의 일정
        row.setAttribute('class', 'row top');
        row.setAttribute('id', 'rowFixTop');
        row.innerHTML= '오늘 일정';
      }
      rowBodyFix.appendChild(row);
    }
    tableBody.appendChild(rowBodyFix);
    for (let i = 0; i <= 24; i++) {
      // row 생성
      // 요일 표시 영역
      const row = document.createElement('div');
      if (i > 0) {
        // 시간별 일정
        row.setAttribute('class', 'row');
      } else {
        // 오늘의 일정
        row.setAttribute('class', 'row top');
        row.setAttribute('id', 'rowTop');
      }
      row.setAttribute('nav-id', i-1);
      for (let j = 0; j < 7; j++) {
        // col 생성
        const col = document.createElement('div');
        col.setAttribute('class', 'col');
        col.setAttribute('nav-id', i);
        if (j === 0) {
          // 일요일
          col.setAttribute('class', 'col sun');
        } 
        if (j === 6) {
          // 토요일
          col.setAttribute('class', 'col sat');
        }
        // 날짜 인덱스 속성 추가
        if (i > 0) {
          // 오늘 날짜 표시
          if (curDate.getMonth() === now.getMonth() && Number(weekArr[j].day) === curDate.getDate()) {
            const beforeClass = col.getAttribute('class');
            col.setAttribute('class', beforeClass + ' on');
          }
          if (i === 1) {
            col.setAttribute('id', 'day' + weekArr[j].day + '-' + 24);
          } else {
            if (i < 11) {
              col.setAttribute('id', 'day' + weekArr[j].day + '-0' + (i - 1));
            } else {
              col.setAttribute('id', 'day' + weekArr[j].day + '-' + (i - 1));
            }
          }
          // 달력 일정 표시
          const scheduleDiv = document.createElement('div');
          scheduleDiv.setAttribute('class', 'scheduleLine');
          const scheduleSpan = document.createElement('span');
          scheduleDiv.appendChild(scheduleSpan);
          col.appendChild(scheduleDiv);
        } else {
          // 오늘의 일정 아이디 추가
          col.setAttribute('id', 'top-' + j);
        }
        col.setAttribute('dayindex', weekArr[j].day);
        row.appendChild(col);
      }

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
    // 이번주 일~토까지 요일 Array
    const weekArr = weekDayArr();
    const curDate = new Date(); // 오늘
    // 달력 일정 초기화
    for (let i = 0; i <= 24; i++) {
      // row 생성
      for (let j = 0; j < 7; j++) {
        // col 생성
        let divId;
        if (i > 0) {
          if (i === 1) {
            divId = 'day' + weekArr[j].day + '-' + 24;
          } else {
            if (i < 11) {
              divId = 'day' + weekArr[j].day + '-0' + (i - 1);
            } else {
              divId = 'day' + weekArr[j].day + '-' + (i - 1);
            }
          }
          const scheduleDiv = document.getElementById(divId).childNodes[0];
          scheduleDiv.setAttribute('class', 'scheduleLine');
          scheduleDiv.setAttribute('uuid', '');
          scheduleDiv.setAttribute('style', '');
          scheduleDiv.childNodes[0].setAttribute('uuid', '');
          scheduleDiv.childNodes[0].innerHTML = '';
        }
        else {
          const topDiv = document.getElementById('rowTop');
          topDiv.setAttribute('style', '');
          // topDiv.childNodes[]
          document.getElementById('rowFixTop').setAttribute('style', '');
        }
      }

      const parentDiv = document.getElementById('rowTop');
      for (let i = 0; i < (parentDiv.childNodes).length; i++) {
        const colDiv = parentDiv.childNodes[i];
        if (colDiv.childNodes.length > 0) {
          for (let j = 0; j < colDiv.childNodes.length; j++) {
            const childDiv = colDiv.childNodes[j];
            colDiv.removeChild(childDiv);
          }
        }
      }
      // 타임라인
      if (i === curDate.getHours()) {
        const timelineDiv = document.createElement('div');
        timelineDiv.setAttribute('class', 'timeline');
      }
    }
  }

  addSchedule() {
    // 등록된 스케쥴 달력에 추가 (주별)
    // 이번주 일~토까지 요일 Array
    const weekArr = weekDayArr();
    const scheduleList = getLocalScheduleList();
    const continutyList = scheduleList[0];
    const unityList = scheduleList[1];
    let continutyWeek = [];
    const unityWeek = [];
    // 오늘 일정 갯수 Arr
    const weekTodayArr = [];

    // console.log(continutyList);
    continutyList.map((continuty) => {
      // console.log(diffDate(now, continuty.endDate, 'DATE'));
      // if (diffDate(now, continuty.endDate, 'DATE') >= 0) {
        weekArr.map((week) => {
          // console.log('startDate Diff >>> ', continuty.endDate, week.date, diffDate(continuty.endDate, week.date, 'DATE'));
          if (diffDate(continuty.endDate, week.date, 'DATE') <= 0) {
            if (diffDate(continuty.startDate, week.date, 'DATE') >= 0 || (getDateFormat(week.date) === continuty.startDate)) {
              // console.log('들어왔따', continuty);
              continutyWeek.push(continuty);
            }
          }
        })
      // }
    });
    // 배열 중복 제거
    continutyWeek = continutyWeek.filter((continuty, idx, array) => {
      return array.indexOf( continuty ) === idx ;
    });
    // console.log('continutyWeek >>> ', continutyWeek);
    unityList.map((unity) => {
      weekArr.map((week) => {
        if (getDateFormat(week.date) === unity.startDate) {
          unityWeek.push(unity);
        }
      })
    });
    // console.log('unityWeek >>> ', unityWeek);

    continutyWeek.map((continuty, continutyIndex) => {
      // 연속 일정
      const startHour = Number((continuty.startTime).substr(0,2));
      let endHour = Number((continuty.endTime).substr(0,2));
      const diffDateRes = diffDate(continuty.startDate, continuty.endDate, 'DATE');
      const singletonDate = new SingletonDateModel();
      const now = singletonDate.getDateFormat();

      // 연속 일정 최상단에 오늘의 일정으로 등록
      weekArr.map((week, weekIndex) => {
        const weekDate = week.date;
        const startDiff = diffDate(weekDate, continuty.startDate, 'DATE');
        const endDiff = diffDate(weekDate, continuty.endDate, 'DATE');
        if ((startDiff === 0 ) || (startDiff <= 0 && endDiff >= 0) || (endDiff === 0)) {
          // console.log('continuty', continuty, getStartDay, getEndDay);
          const span = document.createElement('span');
          span.innerHTML = '(' + continuty.startTime + ') ' + continuty.scheduleTitle;
          span.setAttribute('uuid', continuty.uuid);
          const div = document.createElement('div');
          div.setAttribute('uuid', continuty.uuid);
          div.setAttribute('style', 'background-color: ' + continuty.randomColor + ';');
          div.appendChild(span);
          document.getElementById('top-' + weekIndex).appendChild(div);
        }

        // 오늘 일정 Arr 요일별 일정 갯수 push
        if (continutyIndex === continutyWeek.length - 1) {
          // console.log('rotTop', document.getElementById('rowTop').childNodes[weekIndex].childNodes.length);
          // 마지막 일정 push
          weekTodayArr.push(document.getElementById('rowTop').childNodes[weekIndex].childNodes.length);
        }
      });

      for (let i = 0; i <= diffDateRes; i++) {
        // console.log('>>>>>>>>>>>>>>> ' + i + ' <<<<<<<<<<<<<<<<<<<<');
        weekArr.map((week, index) => {
          // console.log('index >> ', index);
          const weekDate = getDateFormat(new Date(week.date));
          if (weekDate === continuty.startDate) {
            // 첫날
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
              const divId = 'day' + weekDate.substr(8, 2) + '-' + hour;
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
            // console.log('else', weekDate, diffDate(weekDate, continuty.endDate, 'DATE'));
            if (diffDate(weekDate, continuty.endDate, 'DATE') === 0) {
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
                const divId = 'day' + weekDate.substr(8, 2) + '-' + hour;
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
              const startDiff = diffDate(weekDate, continuty.startDate, 'DATE');
              const endDiff = diffDate(weekDate, continuty.endDate, 'DATE');
              if (startDiff < 0 && endDiff > 0) {
                // console.log('중간날1', weekDate, continuty.startDate, diffDate(weekDate, continuty.startDate, 'DATE'));
                // console.log('중간날2', weekDate, continuty.endDate, diffDate(weekDate, continuty.endDate, 'DATE'));
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
                  const divId = 'day' + weekDate.substr(8, 2) + '-' + hour;
                  // console.log(j, divId, document.getElementById(divId));
                  let scheduleDiv;
                  scheduleDiv = document.getElementById(divId).childNodes[0];
                  scheduleDiv.setAttribute('class', 'scheduleLine in');
                  scheduleDiv.setAttribute('style', 'background-color: ' + continuty.randomColor + ';');
                  scheduleDiv.setAttribute('uuid', continuty.uuid);
                  scheduleDiv.childNodes[0].setAttribute('uuid', continuty.uuid);
                }
              } else {
                // console.log('여기?', continuty, i);
              }
            }
          }
        });
        // console.log('>>>>>>>>>>>>>>>  <<<<<<<<<<<<<<<<<<<<');
      }
    });

    // 오늘 일정 Arr 요일별 일정 갯수 중 최댓값 찾아 그 만큼 높이 지정 (css)
    const maxWeekToday = Math.max(...weekTodayArr);
    document.getElementById('rowTop').setAttribute('style', "height: " + (30 * maxWeekToday) + "px;");
    document.getElementById('rowFixTop').setAttribute('style', "height: " + (30 * maxWeekToday) + "px;");

    unityWeek.map((unity) => {
      // 단일 일정
      // console.log('유니티', unity);
      // console.log('유니티 diffDate', diffDate(unity.startDate, unity.endDate, 'DATE'));
      const startDay = (unity.startDate).substr(8, 2);
      let startHour = Number((unity.startTime).substr(0,2));
      let endHour = Number((unity.endTime).substr(0,2));
      let startDate = new Date(unity.startDate);
      // const diffDateRes = diffDate(unity.startDate, unity.endDate, 'DATE');
      // console.log(startDate, getDateFormat(startDate).substr(8,2));
      // console.log(startHour, endHour);
      // console.log(unity.startDate, unity.endDate);
      if (unity.startDate === unity.endDate) {
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
              hour = '0' + j;
            } else {
              hour = j;
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
          if (j === 1) {
            scheduleDiv.childNodes[0].innerHTML = '(' + unity.startTime + ') ' + unity.scheduleTitle;
          } else {
            if (j === startHour) {
              scheduleDiv.childNodes[0].innerHTML = '(' + unity.startTime + ') ' + unity.scheduleTitle;
              if (endHour === 1) {
                scheduleDiv.childNodes[0].innerHTML = '';
              }
            }
          }
        }
      } else {
        // 하루 일정이 양일에 걸쳐 있을 경우
        for (let i = 0; i < 2; i++) {
          if (startHour === 0) {
            startHour = 0;
          }
          if (i === 0) {
            for (let j = startHour; j < 24; j++) {
              let hour = j;
              if (j === 0) {
                // 0 -> 24h
                hour = 24;
              } else {
                if (j < 10) {
                  hour = '0' + j;
                } else {
                  hour = j;
                }
              }
              const divId = 'day' + getDateFormat(startDate).substr(8,2) + '-' + hour;
              let scheduleDiv;
              // console.log(j, startHour, divId);
              scheduleDiv = document.getElementById(divId).childNodes[0];
              scheduleDiv.setAttribute('class', 'scheduleLine in');
              scheduleDiv.setAttribute('style', 'background-color: ' + unity.randomColor + ';');
              scheduleDiv.setAttribute('uuid', unity.uuid);
              scheduleDiv.childNodes[0].setAttribute('uuid', unity.uuid);
              if (j === 1) {
                scheduleDiv.childNodes[0].innerHTML = '(' + unity.startTime + ') ' + unity.scheduleTitle;
              } else {
                if (j === startHour) {
                  scheduleDiv.childNodes[0].innerHTML = '(' + unity.startTime + ') ' + unity.scheduleTitle;
                  if (endHour === 1) {
                    scheduleDiv.childNodes[0].innerHTML = '';
                  }
                }
              }
            }
          } else {
            if (endHour === 0) {
              endHour = 24;
            }
            for (let j = 0; j <= endHour; j++) {
              let hour = j;
              if (j === 0) {
                // 0 -> 24h
                hour = 24;
              } else {
                if (j < 10) {
                  hour = '0' + j;
                } else {
                  hour = j;
                }
              }
              const divId = 'day' + getDateFormat(startDate).substr(8,2) + '-' + hour;
              let scheduleDiv;
              // console.log(j, startHour, divId);
              scheduleDiv = document.getElementById(divId).childNodes[0];
              scheduleDiv.setAttribute('class', 'scheduleLine in');
              scheduleDiv.setAttribute('style', 'background-color: ' + unity.randomColor + ';');
              scheduleDiv.setAttribute('uuid', unity.uuid);
              scheduleDiv.childNodes[0].setAttribute('uuid', unity.uuid);
            }
          }
          startDate = new Date(startDate.setDate((startDate.getDate() + 1)));
        }
      }
    });
  }
}
