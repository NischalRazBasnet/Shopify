import { baseUrl } from '../../app/mainApi';
import { useGetProductsQuery } from './productApi';
import { Rating } from '@material-tailwind/react';

export default function ProductList() {
  const { isLoading, error, data } = useGetProductsQuery();

  if (isLoading) return <h1>Loading...</h1>;
  if (error)
    return <h1 className='mt-20 text-center text-3xl'>No Products Found</h1>;
  console.log(data);
  return (
    <div className='grid grid-cols-4 gap-5 my-5 px-5'>
      {data &&
        data.map(({ _id, image, title, price, rating }) => {
          return (
            <div key={_id}>
              <div className='product-card cursor-pointer'>
                <img
                  className='h-[210px] w-full object-contain'
                  src={`${baseUrl}${image}`}
                  alt={title}
                />
                <div className='px-3 space-y-1'>
                  <h1>{title}</h1>
                  <h2>Rs.{price}</h2>
                  <Rating value={rating} readonly size='sm' />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
