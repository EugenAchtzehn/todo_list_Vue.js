var app = new Vue({
  el: "#app",
  data: {
    newTodo: "",
    todos: [
      {
        id: "12345",
        // 使 label 跟 checkbox 可以對應的 id
        title: "範例待辦 1",
        // 待辦事項的內容，顯示於 <li> 下的 <label> 內
        completed: false
        // 待辦的完成與否
      }
    ],
    category: "all",
    // 預設一進入會在哪個頁籤下
    cacheTodo: {},
    cacheTitle: ""
  },
  methods: {
    addTodo: function() {
      let value = this.newTodo.trim();
      // trim() 會把輸入內容前後多餘的空白刪除
      let timestamp = Math.floor(Date.now());
      // 使用 timestamp 會使每個待辦事件獲得unique ID，在使用 v-for 時綁 :key 會用到
      if (!value) {
        return;
      }
      this.todos.unshift({
        id: timestamp,
        title: value,
        completed: false
      });
      this.newTodo = "";
      // 清空 input 填入的待辦事項
    },

    removeTodo: function(todo) {
      let newIndex = "";
      let vm = this;
      // 抓取 vue 實體
      vm.todos.forEach(function(item, key) {
        if (todo.id === item.id) {
          // 抓到相符合的物件(待辦事項)
          newIndex = key;
          // 把其在陣列的真正位置傳入newIndex
        }
      });
      this.todos.splice(newIndex, 1);
    },

    editTodo: function(item) {
      this.cacheTodo = item;
      this.cacheTitle = item.title;
      // 抓到雙擊要改的物件和文字內容，丟到 cacheTodo, cacheTitle 裡
    },

    cancelEdit: function() {
      this.cacheTodo = {};
      // 按下 esc 取消編輯狀態
    },

    doneEdit: function(item) {
      item.title = this.cacheTitle;
      // 按下 enter，用 cacheTitle 取代該項內容
      this.cacheTitle = "";
      // 接著清空 cacheTitle
      this.cacheTodo = {};
      // 清掉物件，不然 v-if="item.id === cacheTodo.id" 的判斷不會過，畫面會卡住
    },

    removeAllTodos: function() {
      this.todos = [];
      // 清除所有待辦任務
    }
  },
  computed: {
    filteredTodos: function() {
      if (this.category === "all") {
        return this.todos;
      } else if (this.category === "progress") {
        // 如果切換到 progress 頁籤
        let progressTodo = [];
        this.todos.forEach(function(item) {
          // 遍歷 todos 陣列下的物件
          if (!item.completed) {
            // 如果其 completed 為 false (即 checkbox 尚未勾選)，則執行
            progressTodo.push(item);
            // 將 item 加入 progressTodo 的陣列
          }
        });
        return progressTodo;
        // 最後回傳 progressTodo 的成員
      } else if (this.category === "completed") {
        let completedTodo = [];
        this.todos.forEach(function(item) {
          if (item.completed) {
            completedTodo.push(item);
          }
        });
        return completedTodo;
      }
    },

    progressNum: function() {
      let progressTodo = [];
      this.todos.forEach(function(item) {
        if (!item.completed) {
          progressTodo.push(item);
        }
      });
      return progressTodo.length;
    }
  }
});
