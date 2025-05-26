import { Formik } from 'formik';
import {
  Button,
  Input,
  Select,
  Option,
  Textarea,
} from '@material-tailwind/react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { brands, categories } from '../../../../backend/models/Products';
import { useAddProductMutation } from '../products/productApi';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  title: Yup.string().required('title is required'),
  description: Yup.string().required('description is required'),
  price: Yup.number().required('price is required'),
  category: Yup.string().required('category is required'),
  brand: Yup.string().required('brand is required'),
  image: Yup.mixed()
    .required('image is required')
    .test('fileType', 'Unsupported File Format', (value) => {
      console.log(value);
      return ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(
        value.type
      );
    }),
});

export default function ProductAddForm() {
  const nav = useNavigate();
  const [addproduct, { isLoading }] = useAddProductMutation();
  const { user } = useSelector((state) => state.userSlice);

  return (
    <div className='max-w-[400px] mt-10'>
      <Formik
        initialValues={{
          title: '',
          price: '',
          category: '',
          brand: '',
          description: '',
          image: '',
          imagePrev: '',
        }}
        onSubmit={async (val) => {
          const formData = new FormData();
          formData.append('title', val.title);
          formData.append('description', val.description);
          formData.append('price', Number(val.price));
          formData.append('image', val.image);
          formData.append('category', val.category);
          formData.append('brand', val.brand);
          try {
            await addproduct({ body: formData, token: user.token }).unwrap();
            toast.success('Product Successfully Added');
            nav(-1);
          } catch (err) {
            toast.error(err.data?.message || data.error);
            console.log(err);
          }
        }}
        validationSchema={productSchema}
      >
        {({
          handleSubmit,
          handleChange,
          touched,
          values,
          setFieldValue,
          errors,
        }) => (
          <form onSubmit={handleSubmit} className='space-y-5 flex flex-col'>
            <div>
              <Input
                onChange={handleChange}
                value={values.title}
                label='Title'
                name='title'
              />
              {touched.title && errors.title && (
                <p className='text-red-500'>{errors.title}</p>
              )}
            </div>
            <div>
              <Input
                onChange={handleChange}
                value={values.price}
                label='Price'
                name='price'
              />
              {touched.price && errors.price && (
                <p className='text-red-500'>{errors.price}</p>
              )}
            </div>
            <div>
              <Select
                onChange={(e) => setFieldValue('category', e)}
                label='Select Category'
              >
                {categories.map((category) => {
                  return (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  );
                })}
              </Select>
              {touched.category && errors.category && (
                <p className='text-red-500'>{errors.category}</p>
              )}
            </div>
            <div>
              <Select
                onChange={(e) => setFieldValue('brand', e)}
                label='Select Brand'
              >
                {brands.map((brand) => {
                  return (
                    <Option key={brand} value={brand}>
                      {brand}
                    </Option>
                  );
                })}
              </Select>
              {touched.brand && errors.brand && (
                <p className='text-red-500'>{errors.brand}</p>
              )}
            </div>
            <Textarea
              onChange={handleChange}
              value={values.description}
              label='Description'
              name='description'
            />
            {touched.description && errors.description && (
              <p className='text-red-500'>{errors.description}</p>
            )}
            <div>
              <Input
                label='Image'
                type='file'
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue('imagePrev', URL.createObjectURL(file));
                  setFieldValue('image', file);
                }}
                name='image'
              />
              {touched.image && errors.image && (
                <p className='text-red-500'>{errors.image}</p>
              )}
            </div>
            <div>
              {!errors.image && values.imagePrev && (
                <img
                  className='mt-2 w-[200px] h-[200px] object-cover'
                  src={values.imagePrev}
                />
              )}
            </div>

            <Button
              loading={isLoading}
              type='submit'
              className='w-[50%] self-center mt-2'
            >
              Add Product
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
