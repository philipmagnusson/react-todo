export default class TodoItemStore {
  constructor() {
    this.todoItems = [];
    this.keyCounter = 0;
  }

  add(itemText) {
    this.todoItems.push({
      itemKey: this.keyCounter++,
      itemText,
      isDone: false,
    });
  }

  remove(itemKey) {
    this.todoItems = this.todoItems.filter(todoItem => todoItem.itemKey !== itemKey);
  }

  setDone(itemKey, isDone) {
    this.todoItems = this.todoItems.map(todoItem => {
      if (itemKey === todoItem.itemKey) {
        const itemClone = Object.assign({}, todoItem);
        itemClone.isDone = isDone;
        return itemClone;
      }
      return todoItem;
    });
  }

  getItems(filter) {
    return [...this.todoItems];
  }
}
