import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from '@material-tailwind/react';
import { OpenDialog } from '../../components/OpenDialog';
import { useNavigate } from 'react-router';

export function TodoCard({ todo, index }) {
  const nav = useNavigate();
  return (
    <Card className=''>
      <CardBody>
        <Typography variant='h3' color='blue-gray' className='mb-2'>
          {todo.title}
        </Typography>
        <Typography>{todo.description}</Typography>
      </CardBody>
      <CardFooter className='pt-0 flex justify-between'>
        <div>
          <a href='#' className='inline-block'>
            <Button
              size='sm'
              variant='text'
              className='flex items-center gap-2'
            >
              More
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                />
              </svg>
            </Button>
          </a>
        </div>

        <div className='space-x-5'>
          <IconButton
            onClick={() => nav(`/edit-todo/${todo.id}`)}
            color='green'
            size='sm'
          >
            <i className='fas fa-edit' />
          </IconButton>
          <OpenDialog index={index} />
        </div>
      </CardFooter>
    </Card>
  );
}
