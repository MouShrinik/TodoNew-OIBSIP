"use client";

import { useTodos } from "@/stock/tasks";
import { useSearchParams } from "next/navigation";

const ListTodo = () => {
  const { todos, markTodoAsCompleted, handleDelete } = useTodos();
  const searchParams = useSearchParams();
  const todosFilter = searchParams.get("todos");
  //console.log("TodoParams " + todosFilter);

  let filterTodos = todos;

  if (todosFilter === "active") {
    filterTodos = todos.filter((todo) => !todo.completed);
  } else if (todosFilter === "completed") {
    filterTodos = todos.filter((todo) => todo.completed);
  }

  return (
    <div>
      <ul className="list-items">
        {filterTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                name=""
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onChange={() => {
                  console.log(todo.completed);
                  markTodoAsCompleted(todo.id);
                }}
              />
              <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
              {todo.completed && (
                <button type="button" onClick={() => handleDelete(todo.id)}>
                  Delete
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListTodo;
