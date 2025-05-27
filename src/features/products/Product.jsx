import { useParams } from 'react-router';
import { useGetProductQuery } from './productApi';
import { baseUrl } from '../../app/mainApi';
import {
  Button,
  Card,
  IconButton,
  Rating,
  Typography,
} from '@material-tailwind/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Product() {
  const { id } = useParams();
  const { isLoading, error, data } = useGetProductQuery(id);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.data?.message || error?.error}</h1>;

  return (
    <div className='grid grid-cols-3 mt-10 px-12'>
      <div>
        <img src={`${baseUrl}${data.image}`} alt='' />
      </div>
      <div className='space-y-3 py-5'>
        <Typography>{data.title}</Typography>
        <Typography>{data.description}</Typography>
        <Typography color='pink'>{data.price}</Typography>
        <Rating>{data.rating}</Rating>
      </div>
      <ProductAddToCart />
    </div>
  );
}

function ProductAddToCart() {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    const add = (prev) => prev + 1;
    setCount(add);
  };

  const handleMinus = () => {
    const minus = (prev) => prev - 1;
    setCount(minus);
  };
  const { user } = useSelector((state) => state.userSlice);
  return (
    <div>
      <Card className='flex items-center space-y-5 py-3'>
        <h1>Product Quantity</h1>
        <div className='flex gap-3 items-center'>
          <IconButton
            onClick={() => handleMinus()}
            disabled={count === 0}
            size='sm'
          >
            <i className='fas fa-minus' />
          </IconButton>
          <h1>{count}</h1>
          <IconButton onClick={() => handleAdd()} size='sm'>
            <i className='fas fa-add' />
          </IconButton>
        </div>
        <Button size='sm'>Add To Cart</Button>
      </Card>
    </div>
  );
}
