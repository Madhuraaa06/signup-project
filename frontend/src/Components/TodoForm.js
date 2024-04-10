import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/Action/todoslice';
import '../App.css'

function TodoForm() {
    const dispatch = useDispatch();
    const [task, setTask] = useState({name:"",description:""});
    const onFormSubmit =(e) =>{
        // e.preventDefault();
        dispatch(addTask(task));
        setTask({ name: '', description: '' });
    }
    const onInputChange = (e) => {
        setTask({ ...task, [e.target.id]: e.target.value });
      };
    return (
        <div>
            <h1 className='text-centre'>My Todo</h1>
            <div className="container">
            <form onSubmit={onFormSubmit}>
                <div className="mb-3 ">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={task.name}
              onChange={onInputChange}/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={task.description}
              onChange={onInputChange}/>
                </div>
                
                <button disabled={task.name.length<4 || task.description.length<5} type="submit" className="btn btn-secondary mx-4" >Add Task</button>
            </form>
            </div>

            
        </div>

        
    )
}

export default TodoForm
