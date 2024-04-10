
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Define an initial state
const initialState = {
  todos: [],
  status: 'idle',
  error: null,
};

// Define an async thunk for fetching data
export const fetchTodos = createAsyncThunk('fetchTodos', async () => {
  try {
    const response = await fetch("http://localhost:8000/getall",{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;

  }  
  
});


// adding task to the list
export const addTask = createAsyncThunk('addTask', async (newTask) => {
  try {
    const response = await fetch('http://localhost:8000/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add task');
    }
    
    return newTask;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// deleting task
export const deleteTask = createAsyncThunk('deleteTask', async (taskId) => {
  try {
    const response = await fetch(`http://localhost:8000/delete/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }

    return taskId; // Return the deleted task ID
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// update done or not
export const updateTaskStatus = createAsyncThunk(
  'updateTaskStatus',
  async ({ taskId, done }) => {
    try {
      const response = await fetch(`http://localhost:8000/update/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ done }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task status');
      }

      // Fetch the updated task after the update
      const updatedTask = await response.json();
      return updatedTask;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Create a slice
const todoSlice = createSlice({
  name: 'todos',
  initialState,
 
  extraReducers: (builder) => {
    builder
    // fetch task cases
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
    // add task cases
      .addCase(addTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
    // delete task cases
      .addCase(deleteTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
    // Remove the deleted task from the state.todos array
        state.todos = state.todos.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
    // update task cases
      .addCase(updateTaskStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the state.todos array with the updated task
        state.todos = state.todos.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default todoSlice.reducer;
