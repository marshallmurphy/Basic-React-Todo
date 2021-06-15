import React, { useState } from 'react';
import {
  Heading,
  Text,
  Flex,
  Box,
  Button
} from 'rebass';

import {
  Input,
  Checkbox,
  Label
} from '@rebass/forms';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const addTodo = (e) => {
    e.preventDefault();
    if (e.target[0].value.length > 0) {
      const todo = e.target[0].value;
      const newTodos = [...todos];
      newTodos.unshift(todo);
      setTodos(newTodos);
      e.target[0].value = null;
    }
  }

  const completeTodo = (i) => {
    const todo = todos[i];
    completedTodos.unshift(todo);
    setCompletedTodos(completedTodos);

    const newTodos = [...todos];
    newTodos.splice(i, 1);
    setTodos(newTodos);
  }

  const revertTodo = (i) => {
    const todo = completedTodos[i];
    todos.unshift(todo);
    setTodos(todos);

    const newCompletedTodos = [...completedTodos];
    newCompletedTodos.splice(i, 1);
    setCompletedTodos(newCompletedTodos);
  }

  const removeTodo = (i, checked) => {
    if (checked) {
      const newCompletedTodos = [...completedTodos];
      newCompletedTodos.splice(i, 1);
      setCompletedTodos(newCompletedTodos); 
    } else {
      const newTodos = [...todos];
      newTodos.splice(i, 1);
      setTodos(newTodos);
    }
  }

  const checkbox = (todo, i, checked = false) => (
    <Flex
      width='100%'
      justifyContent='space-between'
    >
      <Label
        color='#fff'
      >
        <Checkbox
          checked={checked}
          onChange={() => checked ? revertTodo(i) : completeTodo(i)}
        />
        {todo}
      </Label>

      <Text
        color='#fff'
        onClick={() => removeTodo(i, checked)}
      >
        X
      </Text>
    </Flex>
  );

  return (
    <Flex
      backgroundColor='#282c34'
      height='100vh'
      alignItems='center'
      pt='2rem'
      flexDirection='column'
    >
      <Heading
        fontFamily='Montserrat'
        color='#fff'
        fontSize='4rem'
        mb='2rem'
      >
        Todos
      </Heading>

      <Flex
        as='form'
        onSubmit={(e) => addTodo(e)}
        mb='2rem'
      >
        <Input 
          color='#fff'
          mr='1rem'
        />
        <Button
          width='130px'
          color='#000'
        >
          SUBMIT
        </Button>
      </Flex>

      <Box width='350px'>
        {todos.map((todo, i) => checkbox(todo, i))}
      </Box>

      <hr 
        color='#fff'
        width='350px'
      />

      <Box width='350px'>
        {completedTodos.map((todo, i) => checkbox(todo, i, true))}
      </Box>
    </Flex>
  );
}

export default App;
