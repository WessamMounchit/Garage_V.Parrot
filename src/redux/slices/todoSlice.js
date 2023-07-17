import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { configureStore } from '@reduxjs/toolkit'

const API_BASE_URL = "http://localhost:5000";

// Action asynchrone pour récupérer les tâches
export const getTask = createAsyncThunk("todo/getTask", async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    throw new Error(error.message);
  }
});

// Action asynchrone pour ajouter une tâche
export const addTask = createAsyncThunk("todo/addTask", async (description) => {
  try {
    const body = { description };
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const jsonData = await response.json();

    const todo = { car_id: jsonData.car_id, description: jsonData.description }; // Ajoutez car_id à l'objet todo retourné par l'API

    return todo;
  } catch (error) {
    throw new Error(error.message);
  }
});

// Action asynchrone pour supprimer une tâche
export const deleteTask = createAsyncThunk("todo/deleteTask", async (id) => {
  try {
    await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });
    return id;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateTask = createAsyncThunk('todo/updateTask', async (updatedTodo) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${updatedTodo.car_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // ... vos autres reducers ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTask.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedTodo = action.payload;
        const index = state.todos.findIndex((todo) => todo.car_id === updatedTodo.car_id);
        if (index !== -1) {
          state.todos[index] = updatedTodo;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = state.todos.filter((todo) => todo.car_id !== action.payload);
      });
  },
});

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
});
