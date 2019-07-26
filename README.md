# To-Do List 備忘錄

![image](https://img.shields.io/badge/JavaScript-exercise-F0DB4F.svg) ![image](https://img.shields.io/badge/SCSS-exercise-CD6799.svg)

![image](https://github.com/jedchang/toDoList-simple/blob/master/preview.jpg)

### localStorage.getItem

- 使用 `getItem` 取出 localStorage 輸入的值。
- 使用 `JSON.parse` 將字串轉成物件。
- 初始沒有值就用空陣列
  `let data = JSON.parse(localStorage.getItem('listData')) || [];`

### 自定義資料

用來記錄 checkbox 點擊完成狀態，若完成產生 checked 來判斷依據

```javascript
// 存放資料
let todoList = {
  content: txt,
  done: false
};
```

### localStorage.setItem

- 使用 `setItem` 設定 localStorage 資料。
- 使用 `JSON.stringify` 將陣列轉字串。

### 更新頁面內容

- 使用 `data-*` 讀取自定義資料，用來判斷刪除哪筆資料。
- 動態產出清單，並用三元運算判斷 done 狀態 (true or false) 是否加上 `checked` (打勾樣式) 和 `.completed` 刪除線斜體字。

```javascript
str += `
  <li>
    <input type="checkbox" id="ck${i}" class="checkbox" data-index="${i}" ${items[i].done ? 'checked' : ''} />
    <label for="ck${i}" class="item-label ${items[i].done ? 'completed' : ''}">${items[i].content}</label>
    <i class="far fa-trash-alt" data-index="${i}"></i>
  </li>
`;
```

- CSS 客製 checkbox 樣式與文字刪除樣式。
- 客製樣式用 label 取代預設 input，但選擇用 `opacity:0` 保留在 HTML 上才能點擊觸發。

```scss
// 隱藏原先的 checkbox
input[type='checkbox'] {
  position: absolute;
  opacity: 0; // 不能使用 display: none: 因 js 無法點擊觸發
  z-index: 2;
  width: 24px; // 大小和 label 假按鈕一致
  height: 24px;
  appearance: none; // 移除預設 checkbox 樣式
  cursor: pointer;
}

// 打勾時顯示 改變背景色
input[type='checkbox']:checked + label::before {
  background: #7186df;
  border: 2px solid #7186df;
  transition: all 0.4s;
}

// 打勾時顯 CSS 打勾樣式
input[type='checkbox']:checked + label::after {
  content: '';
  position: absolute;
  top: 6px;
  left: 6px;
  width: 10px;
  height: 6px;
  border: 2px solid #fff;
  border-top: none;
  border-right: none;
  transform: rotate(-45deg);
}

// 取消選取文字效果，增加滑鼠滑入效果
label {
  position: relative;
  display: inline-block;
  cursor: pointer;
  user-select: none;
  color: #777;
}

// 偽元素產生選取框，替代原本選取框
label::before {
  content: '';
  width: 20px;
  height: 20px;
  display: inline-block;
  background: #fff;
  border: 2px solid #ccc;
  margin-right: 7px;
  vertical-align: bottom;
  transition: all 0.4s;
}
```

### checkbox 狀態 & 樣式

- `let index = e.target.dataset.index;` 用 data-index 的數字順序，做為要刪除的依據
- `e.target.matches` 判斷點擊目標是否符合

```javascript
if (e.target.matches('input')) {
  // 判斷 li 數量
  for (let i = 0; i < data.length; i++) {
    // 點擊目標對象 增加 .completed
    if (index == i) {
      oLabel[i].classList.toggle('completed');
    }
  }
  // toggle 效果
  data[index].done = !data[index].done;
}
```

- toggle 效果 `data[index].done = !data[index].done;`

### moment.js 取得當前時間

- 使用套件 moment.js 取得時間
- 拆分時間依照設計樣式排列組合
