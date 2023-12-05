"use client";
import { ReactNode, createContext, useContext, useState } from "react";

export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

export type TaskContext = {
  todos: Todo[];
  handleAddTodo: (task: string) => void;
  markTodoAsCompleted: (id: string) => void;
  handleDelete: (id: string) => void;
};

export const tasksContext = createContext<TaskContext | null>(null);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const newTodos = localStorage.getItem("todos") || "[]";
      return JSON.parse(newTodos) as Todo[];
    } catch (e) {
      return [];
    }
  });

  const handleAddTodo = (task: string) => {
    setTodos((prev) => {
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      console.log(newTodos);

      localStorage.setItem("todos", JSON.stringify(newTodos));

      return newTodos;
    });
  };

  const markTodoAsCompleted = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.filter((task) => task.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  return (
    <tasksContext.Provider
      value={{ todos, handleAddTodo, markTodoAsCompleted, handleDelete }}
    >
      {children}
    </tasksContext.Provider>
  );
};

export function useTodos() {
  const todosContextValue = useContext(tasksContext);
  if (!todosContextValue) {
    throw new Error("It's outside!");
  }
  return todosContextValue;
}
