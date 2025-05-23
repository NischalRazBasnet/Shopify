import React from 'react';
import { useGetProductsQuery } from '../products/productApi';
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import { baseUrl } from '../../app/mainApi';

const TABLE_HEAD = ['Image', 'Title', 'Id', 'Edit', 'Delete'];

export default function AdminPage() {
  const { isLoading, error, data } = useGetProductsQuery();

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>{error}</h1>;

  return (
    <div className='mt-15'>
      <div className='flex justify-end m-5'>
        <Button color='purple'>Add Product</Button>
      </div>
      <Card className='h-full w-full overflow-scroll'>
        <table className='w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'
                >
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal leading-none opacity-70'
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map(({ image, _id, title }, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? 'p-4'
                  : 'p-4 border-b border-blue-gray-50';

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        <Avatar
                          size='xl'
                          className='object-contain'
                          src={`${baseUrl}${image}`}
                        />
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {title}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {_id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <IconButton size='sm' color='green'>
                        <i className='fas fa-edit' />
                      </IconButton>
                    </td>
                    <td className={classes}>
                      <IconButton size='sm' color='pink'>
                        <i className='fas fa-trash' />
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
