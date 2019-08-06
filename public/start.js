console.log('start calendar app!');

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  // 메뉴툴바 영역. (현재 날짜, 화살표, 월간/주간/일간 선택 버튼)
  new MenuToolBar(app).createMenuToolBar();

  // 월간 달력 영역.
  monthTable();

  /**
   * 클릭 이벤트
   */
  // 월간
  document.getElementById('btn3').onclick = () => {
    monthTable();
  }
  // 주간
  document.getElementById('btn2').onclick = () => {
    weekTable();
  }
  // 일간
  document.getElementById('btn1').onclick = () => {
    dayTable();
  }
  // 오늘
  document.getElementById('btn4').onclick = () => {
    todayTable();
  }
  // 이전
  document.getElementById('btn5').onclick = () => {
    beforeTable();
  }
  // 이후
  document.getElementById('btn6').onclick = () => {
    afterTable();
  }
  // 일정 추가
  document.getElementById('btn7').onclick = () => {
    // 팝업 show
    popup();
  }
  // 팝업 - 닫기(X)
  document.getElementById('popupCancel').onclick = () => {
    // 팝업 hide
    popupHide();
  }
  // 팝업 - 저장
  document.getElementById('popupSave').onclick = () => {
    // 일정 저장
    popupSave();
  }
  // 팝업 - 삭제
  document.getElementById('popupDelete').onclick = () => {
    // 일정 삭제
    popupDelete();
  }
  // 팝업 - 수정
  document.getElementById('popupUpdate').onclick = () => {
    // 일정 수정
    popupUpdate();
  }
  // 팝업 - 시작일시 날짜
  document.getElementById('scheduleStartDate').onchange = () => {
    setStartDate();
  }
  // 팝업 - 종료일시 날짜
  document.getElementById('scheduleEndDate').onchange = () => {
    setEndDate();
  }
  // 팝업 - 시작일시 시간
  document.getElementById('selectStartTime').onchange = () => {
    setStartTime();
  }
  // 팝업 - 종료일시 시간
  document.getElementById('selectEndTime').onchange = () => {
    // 종료일시 시간
    setEndTime();
  }

  // 클릭 이벤트 감지
  document.addEventListener('click', (e) => {
    // console.log(e, e.target);
    if (e.target.getAttribute('uuid')) {
      // 등록한 일정 클릭 시, 일정 팝업 show
      const clickUuid = e.target.getAttribute('uuid');
      const scheduleList =this.getLocalStorage('scheduleList');
      const findIndex = scheduleList.findIndex((schedule) => schedule.uuid === clickUuid);
      if (findIndex !== -1) {
        // 클릭한 일정 데이터
        const clickedSchedule = scheduleList[findIndex];
        // console.log(clickedSchedule);
        this.popupShow(clickedSchedule);
      }
    }
  });
})
