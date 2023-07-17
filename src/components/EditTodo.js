import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../redux/slices/todoSlice';

const EditTodo = () => {
  const todo = useSelector((state) => state.todo.todos.find((todo) => todo !== null)); // Utilisation de find() pour obtenir un todo valide
  const dispatch = useDispatch();
  const [description, setDescription] = useState(todo?.description);

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const updatedTodo = { ...todo, description }; // Création d'un nouvel objet todo avec la description mise à jour
      dispatch(updateTask(updatedTodo)); // Appel de l'action de mise à jour du todo
      window.location = '/';
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      {todo && (
        <>
          <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${todo.car_id}`}>
            Edit
          </button>

          <div className="modal" id={`id${todo.car_id}`} onClick={() => setDescription(todo.description)}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Edit Todo</h4>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setDescription(todo.description)}></button>
                </div>

                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={updateDescription}>
                    Edit
                  </button>
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => setDescription(todo.description)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditTodo;
