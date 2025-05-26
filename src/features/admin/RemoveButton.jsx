import React from 'react';
import { useRemoveProductMutation } from '../products/productApi';
import toast from 'react-hot-toast';
import { IconButton } from '@material-tailwind/react';
import { useSelector } from 'react-redux';

export default function RemoveButton({ id }) {
  const [removeProduct, { isLoading }] = useRemoveProductMutation();
  const { user } = useSelector((state) => state.userSlice);
  const handleRemove = async () => {
    try {
      await removeProduct({ id, token: user.token }).unwrap();
      toast.success('Product Removed Successfully');
    } catch (err) {
      toast.error(err.data?.message || err.data);
    }
  };
  return (
    <IconButton onClick={handleRemove} size='sm' color='pink'>
      <i className='fas fa-edit' />
    </IconButton>
  );
}
