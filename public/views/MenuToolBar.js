class MenuToolBar {

  constructor (app) {
    this.app = app;
  }

  createMenuToolBar() {
    // Singleton 패턴 날짜
    const singletonDate = new SingletonDateModel();
    const now = singletonDate.getCurDate();

    // 메뉴툴바 영역
    const divTag = document.createElement('div');
    divTag.setAttribute('id', 'menuToolBar');
    divTag.setAttribute('class', 'menuToolBar');
    
    // 날짜 변경 선택 영역
    const divTag3 = document.createElement('div');
    divTag3.setAttribute('class', 'menu-tool-date-change');

    // 달력 선택 영역
    const divTag2 = document.createElement('div');
    divTag2.setAttribute('class', 'menu-tool-calendar');

    // 일정 추가 버튼 영역
    const divTag4 = document.createElement('div');
    divTag4.setAttribute('class', 'menu-tool-schedule');
    
    // 날짜 표시 영역
    const divTag5 = document.createElement('div');
    divTag5.setAttribute('id', 'menuDate');
    divTag5.setAttribute('class', 'menu-tool-date');
    divTag5.innerHTML  = singletonDate.getDateFormat();

    // 일간 버튼
    const btn1 = document.createElement('button');
    btn1.setAttribute('id', 'btn1');
    btn1.innerHTML = '일간';

    // 주간 버튼
    const btn2 = document.createElement('button');
    btn2.setAttribute('id', 'btn2');
    btn2.innerHTML = '주간';

    // 월간 버튼
    const btn3 = document.createElement('button');
    btn3.setAttribute('id', 'btn3');
    btn3.innerHTML = '월간';

    // 오늘 버튼
    const btn4 = document.createElement('button');
    btn4.setAttribute('id', 'btn4');
    btn4.innerHTML = '오늘';

    // < 버튼
    const btn5 = document.createElement('button');
    btn5.setAttribute('id', 'btn5');
    btn5.innerHTML = '<';

    // > 버튼
    const btn6 = document.createElement('button');
    btn6.setAttribute('id', 'btn6');
    btn6.innerHTML = '>';

    // 일정추가 버튼
    const btn7 = document.createElement('button');
    btn7.setAttribute('id', 'btn7');
    btn7.innerHTML = '일정추가';
    
    // 달력 선택 영역에 일간, 주간, 월간 버튼 추가
    divTag2.appendChild(btn1);
    divTag2.appendChild(btn2);
    divTag2.appendChild(btn3);

    // 날짜 변경 선택 영역에 <, 오늘, > 버튼 추가
    divTag3.appendChild(btn5);
    divTag3.appendChild(btn4);
    divTag3.appendChild(btn6);

    // 일정 추가 버튼 영역에 일정추가 버튼 추가
    divTag4.appendChild(btn7);

    // 메뉴툴바 영역에 날짜 영역, 달력 선택 영역, 날짜 변경 선택 영역 DIV 추가
    divTag.appendChild(divTag5);
    divTag.appendChild(divTag3);
    divTag.appendChild(divTag2);
    divTag.appendChild(divTag4);
    
    this.app.appendChild(divTag);
  }
}
