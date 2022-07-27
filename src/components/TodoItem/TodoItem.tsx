import { useEffect, useState } from "react";

function TodoItem({el, todos, setTodos}: any) {
  const [checked, setChecked] = useState(el.check);
  const chengeCheckbox = () => {
    setChecked(!checked);
  }
  useEffect(()=> {
    setTodos([...todos.map((todo: any) => {
      if(todo.id === el.id) return {
        ...todo,
        check: checked
      }
      return todo
    })])
  }, [checked])
  return (
    <li>
      <input 
        type="checkbox" 
        id={el.id} 
        checked={checked}
        onChange={chengeCheckbox}
      />
      <label htmlFor={el.id}>{el.content}</label>
    </li>
  )
}

export default TodoItem