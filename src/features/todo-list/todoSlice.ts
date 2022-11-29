import { Action, createSlice, ThunkDispatch } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../app/store';

export interface ToDoState {
  toDoValue: Array<string>;
  successValue: Array<string>;
  loading: boolean;
}

const initialState: ToDoState = {
  toDoValue: [],
  successValue: [],
  loading: false,
};

export const todoSlicer = createSlice({
  name: 'toDo',
  initialState,
  reducers: {
    addItem: (state, action) => ({
      ...state,
      toDoValue: [...state.toDoValue, action.payload]
    }),
    removeItem: (state, action) => ({
      ...state,
      toDoValue: state.toDoValue.filter((item, indexToDo) => indexToDo !== action.payload)
    }),
    succedItem: (state, action) => ({
      ...state,
      toDoValue: state.toDoValue.filter((item, indexToDo) => indexToDo !== action.payload),
      successValue: [...state.successValue, state.toDoValue.at(action.payload) || '']
    }),
    clearSuccedList: (state) => ({
      ...state,
      successValue: []
    }),
    editItem: (state, action) => ({
      ...state,
      toDoValue: state.toDoValue.map((item, toDoIndex) => toDoIndex === action.payload.index ? action.payload.newItem : item)
    }),
    setLoading: (state, action) => ({
      ...state,
      loading: action.payload
    }),
  },

});

export const thunkFunction = (dispatch: ThunkDispatch<RootState, void, Action>, getState: () => RootState) => {
  dispatch(setLoading(true))
  setTimeout(() => {
    console.log(getState())
    dispatch(clearSuccedList())
    dispatch(setLoading(false))
  }, 3000);
}

export const { addItem, removeItem, succedItem, clearSuccedList, setLoading, editItem } = todoSlicer.actions;

export const selectToDo = (state: RootState) => state.toDoValue;

export const selectSucced = (state: RootState) => state.successValue;

export const selectLoading = (state: RootState) => state.loading;


export default todoSlicer.reducer;
