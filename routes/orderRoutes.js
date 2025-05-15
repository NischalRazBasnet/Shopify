import express from 'express';
import {
  createOrder,
  getOrders,
  getUserOrders,
} from '../controllers/orderController';
import { adminCheck, userCheck } from '../middlewares/userCheck';
import { notAllowed } from '../utils/shareFunc';

const router = express.Router();

router
  .route('/')
  .get(userCheck, adminCheck, getOrders)
  .post(userCheck, createOrder)
  .all(notAllowed);

router.route('/users').get(userCheck, getUserOrders);
