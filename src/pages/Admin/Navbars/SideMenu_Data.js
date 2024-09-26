import * as Yup from 'yup';

export const CouponSchema = Yup.object().shape({
  limit: Yup.number().required('Limit  is required'),
  code: Yup.string().required('Code is required'),
  value: Yup.string().required('Value is required'),
  description: Yup.string().required('Description is required'),
  startDate: Yup.string().required('Start Date is required'),
  endDate: Yup.string().required('End Date required'),
});

import {
  MdAdminPanelSettings,
} from 'react-icons/md';
import {FaUser } from 'react-icons/fa';
import { IoGiftSharp } from 'react-icons/io5';

export const sidebarItems = [
  {
    id: 1,
    label: ' Dashboard',
    parent_id: null,
    icon: <MdAdminPanelSettings size={20} />,
    module: 'dashboard',
    order_index: 1,
    url: '/admin/dashboard',
  },
  {
    id: 2,
    label: 'User List',
    parent_id: null,
    icon: <FaUser size={20} />,
    module: 'user',
    order_index: 2,
    url: '/admin/user-list',
  },
  {
    id: 3,
    label: 'Coupon',
    parent_id: null,
    icon: <IoGiftSharp size={20} />,
    module: 'coupon_code',
    order_index: 3,
    url: '/admin/coupon',
  },


];
