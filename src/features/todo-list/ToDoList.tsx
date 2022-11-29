import { Box, Button, FormGroup, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  addItem,
  removeItem,
  succedItem,
  editItem,
  selectToDo,
  selectSucced,
  thunkFunction,
  selectLoading,
} from './todoSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneIcon from '@mui/icons-material/Done';
import { useMediaQuery } from 'react-responsive'

export function ToDoList() {
  const toDo = useAppSelector(selectToDo);
  const succed = useAppSelector(selectSucced);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  const [newItem, setNewItem] = useState('');
  const [blockTick, setBlockTick] = useState(false);
  const isSmallSize = useMediaQuery({ query: '(max-width: 400px)' })

  return (
    <Box sx={{ width: '100%', maxWidth: 800, margin: '0 auto', textAlign: 'center', padding: '2rem', boxSizing: 'border-box' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        To Do App
      </Typography>
      <FormGroup row style={{ justifyContent: 'center', marginBottom: '3rem' }}>
        <TextField
          id="outlined-basic"
          label="New item"
          variant="outlined"
          value={newItem}
          onChange={(e) => {
            setNewItem(e.target.value);
          }}
        />
        <Button variant="contained" onClick={() => {
          if (newItem !== '' && !toDo.includes(newItem) && !succed.includes(newItem)) {
            dispatch(addItem(newItem));
            setNewItem('');
          }
        }} style={{ marginLeft: '5px', marginTop: isSmallSize ? '15px' : '' }}
        >Add item</Button>
      </FormGroup>
      {!!toDo.length && <div>
        <Typography variant="h4" component="h2" gutterBottom>
          To Do List
        </Typography>
        {
          toDo.map((item, index) => <FormGroup row style={{ justifyContent: 'center', alignItems: 'center', marginTop: '15px' }} key={item} >
            <TextField
              id="outlined-basic"
              variant="outlined"
              defaultValue={item}
              onBlur={(e) => { dispatch(editItem({ newItem: e.target.value, index })); setBlockTick(false) }}
              onChange={() => setBlockTick(true)}
              style={{ marginRight: '5px' }}
            />
            {!blockTick && <div>
              <DeleteForeverIcon onClick={() => dispatch(removeItem(index))} style={{ marginRight: '5px', fontSize: '2rem', cursor: 'pointer', color: 'red' }} />
              <DoneIcon onClick={() => dispatch(succedItem(index))} style={{ marginRight: '5px', fontSize: '2.5rem', cursor: 'pointer', color: 'green' }} />
            </div>}
          </FormGroup>)
        }
      </div>}

      {loading ?
        <CircularProgress color="inherit" style={{ marginTop: '1rem' }} />
        : !!succed.length && <div>
          <Typography variant="h4" component="h2" gutterBottom style={{ marginTop: '3rem' }}>
            Ready
          </Typography>
          <Button onClick={() => dispatch(thunkFunction)} style={{ marginBottom: '0.3rem' }}
          >Clear List</Button>
          {
            succed.map((item) =>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={item}
                disabled
                key={item}
                style={{ display: 'block', marginBottom: '1rem' }}
              />
            )
          }
        </div>}
    </Box >
  );
}
