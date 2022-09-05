import React, { useState } from 'react';
import styles from './InputLabel.module.scss';
import { v4 } from 'uuid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TodoItem from '../TodoItem/TodoItem';
import { Button } from '@mui/material';

function InputLabel() {
  interface Todo {
    id: string,
    content: string,
    check: boolean
  }
  const [alignment, setAlignment] = useState('all');
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [value, setValue] = useState('');
  const [list, setList] = useState('');
  const clearComplete = () => {
    setTodos([...todos.filter((todo: Todo) => {
      if (!todo.check) return todo;
      return undefined
    })])
  }
  const handleChange = (event: any, newAlignment: any) => {
    setAlignment(newAlignment);
  };
  const showList = () => {
    if (list) { setList('') }
    else { setList('active') }
  }
  const todoSend = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' && value.trim()) {
      const newTodo: Todo = {
        id: v4(),
        content: value,
        check: false
      }
      setTodos([newTodo, ...todos])
      setValue('');
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.input}>
        <button
          onClick={() => showList()}
        ></button>
        <input
          type="text"
          placeholder='What needs to be done'
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          onKeyDown={todoSend}
        />
      </div>
      <div className={styles.nav}>
        <ToggleButtonGroup
          size='small'
          value={alignment}
          color='primary'
          exclusive
          onChange={handleChange}
        >
          <ToggleButton
            value='all'
          >All</ToggleButton>
          <ToggleButton
            value='active'
          >Active</ToggleButton>
          <ToggleButton
            value='completed'
          >Completed</ToggleButton>
        </ToggleButtonGroup>
        <Button
          variant="contained"
          onClick={clearComplete}
        >Clear completed</Button>
      </div>
      <ul
        className={`${styles.list} ${styles[`${list}`]}`}
      >
        {todos.map((el: Todo) => {
          if (alignment === 'all') {
            return (
              <TodoItem
                key={el.id}
                el={el}
                todos={todos}
                setTodos={setTodos}
              />
            )
          }
          else if (alignment === 'active') {
            if (!el.check) {
              return (
                <TodoItem
                  key={el.id}
                  el={el}
                  todos={todos}
                  setTodos={setTodos}
                />
              )
            }
          }
          else if (alignment === 'completed') {
            if (el.check) {
              return (
                <TodoItem
                  key={el.id}
                  el={el}
                  todos={todos}
                  setTodos={setTodos}
                />
              )
            }
          }
          return undefined
        })}
      </ul>
    </div>
  )
}

export default InputLabel