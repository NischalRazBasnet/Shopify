import { useNavigate, useParams } from 'react-router';
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
import { useDispatch, useSelector } from 'react-redux';
import { setToCart } from '../carts/cartSlice';

export default function Product() {
  const { id } = useParams();
  const { isLoading, error, data } = useGetProductQuery(id);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.data?.message || error?.error}</h1>;

  return (
    <div className='grid grid-cols-3 mt-10 px-12'>
      <div>
        <img className='w-[250px]' src={`${baseUrl}${data.image}`} alt='' />
      </div>
      <div className='space-y-3 py-5'>
        <Typography>{data.title}</Typography>
        <Typography>{data.description}</Typography>
        <Typography color='pink'>{data.price}</Typography>
        <Rating>{data.rating}</Rating>
      </div>
      <ProductAddToCart product={data} />
    </div>
  );
}

function ProductAddToCart({ product }) {
  const nav = useNavigate();

  const [count, setCount] = useState(product.qty);

  const dispatch = useDispatch();

  const handleCart = () => {
    dispatch(
      setToCart({
        title: product.title,
        image: product.image,
        price: product.price,
        qty: count,
        _id: product._id,
      })
    );
    nav('/carts');
  };

  return (
    <div>
      <Card className='flex items-center space-y-5 py-3'>
        <h1>Product Quantity</h1>
        <div className='flex gap-3 items-center'>
          <IconButton
            onClick={() => setCount(count - 1)}
            disabled={count === 1}
            size='sm'
          >
            <i className='fas fa-minus' />
          </IconButton>
          <h1>{count}</h1>
          <IconButton onClick={() => setCount(count + 1)} size='sm'>
            <i className='fas fa-add' />
          </IconButton>
        </div>
        <Button
          onClick={handleCart}
          disabled={!user || user.role === 'Admin'}
          size='sm'
        >
          Add To Cart
        </Button>
      </Card>
    </div>
  );
}
