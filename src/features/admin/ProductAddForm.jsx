import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  Button,
  Input,
  IconButton,
  Typography,
  Select,
  Option,
  Textarea,
} from '@material-tailwind/react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../user/userSlice';
import { brands, categories } from '../../../../backend/models/Products';
import { useAddProductMutation } from '../products/productApi';

export default function ProductAddForm() {
  const nav = useNavigate();
  const [addproduct, { isLoading }] = useAddProductMutation();
  const { user } = useSelector((state) => state.userSlice);

  return (
    <div className='max-w-[400px] mt-10'>
      <Formik
        initialValues={{
          title: '',
          description: '',
          price: '',
          image: '',
          category: '',
          description: '',
          brand: '',
        }}
        onSubmit={async (val) => {
          const formData = new FormData();
          formData.append('title', val.title);
          formData.append('description', val.description);
          formData.append('price', Number(val.price));
          formData.append('image', val.image);
          formData.append('brand', val.brand);
          formData.append('category', val.category);
          try {
            await addproduct({ body: formData, token: user.token }).unwrap();
            toast.success('Product Successfully Added');
          } catch (err) {
            toast.error(err.data?.message || data.error);
            console.log(err);
          }
        }}
      >
        {({ handleSubmit, handleChange, touched, values, setFieldValue }) => (
          <form onSubmit={handleSubmit} className='space-y-5 flex flex-col'>
            <div>
              <Input
                onChange={handleChange}
                value={values.title}
                label='Title'
                name='title'
              />
            </div>
            <div>
              <Input
                onChange={handleChange}
                value={values.price}
                label='Price'
                name='price'
              />
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
            </div>
            <Textarea
              onChange={handleChange}
              value={values.description}
              label='Description'
              name='description'
            />
            <div>
              <Input
                label='Image'
                type='file'
                onChange={handleChange}
                name='image'
              />
            </div>

            <Button type='submit' className='w-[50%] self-center mt-2'>
              Add Product
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
