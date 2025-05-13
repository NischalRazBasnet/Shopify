import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from '@material-tailwind/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTodo } from '../pages/todo/todoSlice';

export function OpenDialog({ index }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(!open);

  const handleRemove = () => {
    dispatch(removeTodo(index));
    handleOpen();
  };
  return (
    <>
      <IconButton onClick={handleOpen} color='pink' size='sm'>
        <i className='fas fa-trash' />
      </IconButton>
      <Dialog size='sm' open={open} handler={handleOpen}>
        <DialogHeader>Are you sure?</DialogHeader>
        <DialogBody>
          Click on 'CONFIRM' to permanently delete this file
        </DialogBody>
        <DialogFooter>
          <Button
            variant='text'
            color='red'
            onClick={handleOpen}
            className='mr-1'
          >
            <span>Cancel</span>
          </Button>
          <Button variant='gradient' color='green' onClick={handleRemove}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
