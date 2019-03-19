(function() {
  let sendData = document.querySelector('.add-btn');
  let oList = document.querySelector('.list');
  let oTxt = document.querySelector('.text');

  // JSON.parse 將字串轉成物件，listData 為自訂名稱
  // 用 getItem 取出 localStorage 裡面的值。若沒有值則為空陣列
  let data = JSON.parse(localStorage.getItem('listData')) || [];

  // 監聽與更新
  sendData.addEventListener('click', addData);
  oList.addEventListener('click', toggleDone);
  oTxt.addEventListener('keydown', keyAddData);

  // 初始化更新頁面，有就帶 data getItem 的值，沒有就空陣列
  updateList(data);
  // 初始化日期，一開始畫面不會晃動
  updateDate();

  /*----------  鍵盤事件  ----------*/
  // 按下 enter 輸入，keyCode、which 針對支援不同瀏覽器
  function keyAddData(e) {
    if (e.keyCode === 13 || e.which === 13) {
      addData();
    }
  }

  /*----------  加入列表，並同步更新網頁與 localStorage  ----------*/
  function addData() {
    // 取得輸入的值
    let txt = oTxt.value.trim();
    // console.log(txt);

    // 存放資料
    let todoList = {
      content: txt,
      done: false
    };

    // 判斷沒有輸入值或先空格，即無法輸入
    if (oTxt.value == '' || oTxt.value.trim() == '') {
      return;
    }

    // 將資料加入 data 陣列中
    data.push(todoList);
    // console.log(data);

    // 記得要更新畫面
    updateList(data);

    // setItem 設定 localStorage 資料。
    // listData 為自訂名稱，JSON.stringify 將陣列轉字串
    localStorage.setItem('listData', JSON.stringify(data));

    // 輸入後清空內容
    oTxt.value = '';
  }

  /*----------  更新網頁內容  ----------*/
  function updateList(items) {
    // 依據帶入參數 items，動態產出 li 數量
    let str = '';
    for (let i = 0; i < items.length; i++) {
      // 判斷 done 狀態 (true or false)，增加 checked (打勾)、增加 .completed 刪除線斜體字
      str += `
      <li>
        <input type="checkbox" id="ck${i}" class="checkbox" data-index="${i}" ${items[i].done ? 'checked' : ''} />
        <label for="ck${i}" class="item-label ${items[i].done ? 'completed' : ''}">${items[i].content}</label>
        <i class="far fa-trash-alt" data-index="${i}"></i>
      </li>
    `;
    }
    oList.innerHTML = str;
  }

  /*----------  checkbox 狀態、刪除列表  ----------*/
  function toggleDone(e) {
    // 使用了 checkbox 打勾會被清除
    // e.preventDefault();

    let oLabel = document.querySelectorAll('.item-label');

    // 用 data-index 的數字順序，做為要刪除的依據
    let index = e.target.dataset.index;

    // 點選到 i (刪除 icon) 才執行
    if (e.target.matches('i')) {
      // index == 刪除位置，1 == 數量，0 是不刪除
      data.splice(index, 1);
    }

    if (e.target.matches('input')) {
      // 判斷 li 數量
      for (let i = 0; i < data.length; i++) {
        // 點擊目標對象 增加 .completed
        if (index == i) {
          console.log(oLabel[i]);
          oLabel[i].classList.toggle('completed');
        }
      }
      // toggle 效果
      data[index].done = !data[index].done;
    }

    // 刪除後需再設定 localStorage setItem
    localStorage.setItem('listData', JSON.stringify(data));
    // 更新畫面
    updateList(data);
  }

  /*----------  增加日期  ----------*/
  function updateDate() {
    let oMonthYear = document.querySelector('.month-year');
    let oDay = document.querySelector('.day');
    let oWeek = document.querySelector('.week');

    // 定義 d 來獲取當前時間
    let d = new Date();
    // 使用 moment() 格式為 (Mar 14th 2019 Thursday)
    let currentDate = moment(d).format('MMM Do YYYY dddd');
    // split 將字串分割成字串陣列 ["Mar", "14th", "2019", "Thursday"]
    let str = currentDate.split(' ');

    // console.log(currentDate);

    // 拆出 MAR 14 2019
    let yearStr = str[2];
    let monthStr = str[0].toUpperCase();
    let dayStr = str[1].substr(0, 2);
    let weekStr = str[3].toUpperCase();
    let monthYear = monthStr + ', ' + yearStr;

    oMonthYear.innerHTML = monthYear;
    oDay.innerHTML = dayStr;
    oWeek.innerHTML = weekStr;
  }

  // 每1秒更新一次時間
  setInterval(updateDate, 1000);
})();
