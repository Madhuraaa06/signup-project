import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTaskStatus } from '../redux/Action/todoslice';
import '../App.css'
function Card({todo}) {
  const dispatch = useDispatch();

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleUpdateStatus = (taskId, done) => {
    dispatch(updateTaskStatus({ taskId, done: !done }));
  };
  return (
    <div className= "my-2">
            <div className="card">
            
                    <div className="card-body">
                    <div className="d-flex ">
                        <div className="p-2 flex-fill"><h5 className={`fs-3 ${todo.done ? 'completed-text' : ''}`}>{todo.name}</h5></div>
                        <button type="button" className="btn btn-outline-success mx-2" onClick={() => handleUpdateStatus(todo._id, todo.done)} disabled={todo.done}>Complete</button>
                        <button type="button" className="btn btn-outline-danger" onClick={()=> handleDelete(todo._id)}>Delete</button>
                        
                        
                        </div>
                        <p className={`fs-7 ${todo.done ? 'completed-text' : ''}`}>{todo.description}</p>
                        
                    </div>
            </div>
        </div>
  )
}

export default Card
