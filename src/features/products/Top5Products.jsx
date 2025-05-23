import { Carousel } from '@material-tailwind/react';
import { useGetTop5ProductsQuery } from './productApi';
import { baseUrl } from '../../app/mainApi';
export default function Top5Products() {
  const { isLoading, data, error } = useGetTop5ProductsQuery();

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  // console.log(data);
  return (
    <div>
      <Carousel autoplay loop className=' h-[450px]'>
        {data &&
          data.map(({ _id, image }) => {
            return (
              <img
                key={_id}
                src={`${baseUrl}${image}`}
                alt='image 1'
                className='h-full w-full object-cover'
              />
            );
          })}
      </Carousel>
    </div>
  );
}
