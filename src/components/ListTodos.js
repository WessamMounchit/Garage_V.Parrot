import React, { useEffect } from 'react';
import EditTodo from './EditTodo';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getTask } from '../redux/slices/todoSlice';

const ListTodos = () => {
  const state = useSelector(state => state.todo);

  console.log(state)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTask());
  }, [dispatch]);

  return (
    <>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {state.todos.map(todo => (
            <tr key={todo.car_id}>
              <td>{todo.description}</td>
              <td><EditTodo /></td>
              <td><button className='btn btn-danger' onClick={() => dispatch(deleteTask(todo.car_id))}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListTodos;
