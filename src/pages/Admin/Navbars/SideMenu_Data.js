import * as Yup from 'yup';
import {
  MdAdminPanelSettings,
} from 'react-icons/md';
import { FaHeadphones, FaStar, FaUser } from 'react-icons/fa';
import { GiTeacher } from "react-icons/gi";
import { BiSolidCategory } from 'react-icons/bi';
import { SiLevelsdotfyi } from "react-icons/si";

// Validation schema for coupons
export const CouponSchema = Yup.object().shape({
  limit: Yup.number().required('Limit is required'),
  code: Yup.string().required('Code is required'),
  value: Yup.string().required('Value is required'),
  description: Yup.string().required('Description is required'),
  startDate: Yup.string().required('Start Date is required'),
  endDate: Yup.string().required('End Date required'),
});

// Sidebar items definition
export const sidebarItems = [
  {
    id: 1,
    label: 'Dashboard',
    parent_id: null,
    icon: <MdAdminPanelSettings size={20} />,
    module: 'dashboard',
    order_index: 1,
    url: '/admin/dashboard',
  },
  {
    id: 2,
    label: 'Student List',
    parent_id: null,
    icon: <FaUser size={20} />,
    module: 'student',
    order_index: 2,
    url: '/admin/student-list',
  },
  {
    id: 3,
    label: 'Trainer List',
    parent_id: null,
    icon: <GiTeacher size={20} />,
    module: 'coupon_code',
    order_index: 3,
    url: '/admin/trainer-list',
  },
  {
    id: 4,
    label: 'Contact Us',
    parent_id: null,
    icon: <FaHeadphones  size={20} />,
    module: 'coupon_code',
    order_index: 4,
    url: '/admin/contact-us',
  },
  
  {
    id: 5,
    label: 'Ratings',
    parent_id: null,
    icon: <FaStar   size={20} />,
    module: 'coupon_code',
    order_index: 5,
    url: '/admin/ratings',
  },
  {
    id: 5,
    label: 'Plans',
    parent_id: null,
    icon: <FaStar   size={20} />,
    module: 'coupon_code',
    order_index: 5,
    url: '/admin/plans',
  },
  {
    id: 5,
    label: 'Category',
    parent_id: null,
    icon: <BiSolidCategory    size={20} />,
    module: 'coupon_code',
    order_index: 5,
    url: '/admin/category',
  },
  {
    id: 5,
    label: 'Level',
    parent_id: null,
    icon: <SiLevelsdotfyi     size={20} />,
    module: 'coupon_code',
    order_index: 5,
    url: '/admin/level',
  },
];
