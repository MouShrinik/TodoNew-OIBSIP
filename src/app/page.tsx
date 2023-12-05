import FormTodo from "@/components/FormTodo"
import ListTodo from "@/components/ListTodo"
import Navbar from "@/components/Navbar"
import "./globals.css"
import { RiTodoLine } from "react-icons/ri";


const page = () => {
  return (
    <main>
      <h2> <RiTodoLine className="icons"/> TODO</h2>
      <Navbar />
      <FormTodo />
      <ListTodo />
    </main>
  )
}

export default page