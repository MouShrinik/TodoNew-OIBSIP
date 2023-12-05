"use client"
import { useTodos } from "@/stock/tasks";
import { FormEvent, useState } from "react";

const FormTodo = () => {

  const[ todo, setTodo ] = useState("");

  const { handleAddTodo } = useTodos();
 
 
  function handleFormSubmit (e:FormEvent<HTMLFormElement>){
      e.preventDefault();
      handleAddTodo(todo) 
      setTodo("");
     }
 
     return (
        <div className="form">
            <form onSubmit={handleFormSubmit}>
             <input type="text" value={todo} placeholder="Write your todos..."
                    onChange={(e) => setTodo(e.target.value)} />
             <button type="submit">ADD</button>
         </form>
       </div>
     )
 }
 

export default FormTodo;
