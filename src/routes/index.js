import { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Loader from '../components/Loader';
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import DashboardLayout from '../pages/Admin/Dashboard/DashboardLayout';


const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // {
    //   path: '/',
    //   element: (
    //     <GuestGuard>
    //       <HomeLayout />
    //     </GuestGuard>
    //   ),
    //   children: [
    //     {
    //       path: '/',
    //       element: (
    //         <GuestGuard>
    //           <Home />
    //         </GuestGuard>
    //       ),
    //     },
    //     {
    //       path: '/rent',
    //       element: (
    //         <GuestGuard>
    //           <RentLayout />
    //         </GuestGuard>
    //       ),
    //       children: [
    //         {
    //           path: '/rent',
    //           element: (
    //             <GuestGuard>
    //               <Rent />
    //             </GuestGuard>
    //           ),
    //         },
    //         {
    //           path: '/rent/rent-details',
    //           element: (
    //             <GuestGuard>
    //               <RentDetails />
    //             </GuestGuard>
    //           ),
    //         },
    //       ],
    //     },
    //     {
    //       path: '/refurbished',
    //       element: (
    //         <GuestGuard>
    //           <RefurbishedLayout />
    //         </GuestGuard>
    //       ),
    //       children: [
    //         {
    //           path: '/refurbished',
    //           element: (
    //             <GuestGuard>
    //               <Refurbished />
    //             </GuestGuard>
    //           ),
    //         },
    //         {
    //           path: '/refurbished/refurbished-details',
    //           element: (
    //             <GuestGuard>
    //               <RefurbishedDetails />
    //             </GuestGuard>
    //           ),
    //         },
    //       ],
    //     },
    //     {
    //       path: '/repair-service',
    //       element: (
    //         <GuestGuard>
    //           <RepairServiceLayout />
    //         </GuestGuard>
    //       ),
    //       children: [
    //         {
    //           path: '/repair-service',
    //           element: (
    //             <GuestGuard>
    //               <RepairService />
    //             </GuestGuard>
    //           ),
    //         },
    //       ],
    //     },
    //   ],
    // },

    {
      path: '/',
      element: (
        <GuestGuard>
          <Login />
        </GuestGuard>
      ),
    },
    {
      path: 'admin',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        // {
        //   path: '/admin/user-list',
        //   element: (
        //     <AuthGuard>
        //       <UserList />
        //     </AuthGuard>
        //   ),
        // },
        {
          path: '/admin/dashboard',
          element: (
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          ),
        },
    
        {
          path: '/admin/student-list',
          element: (
            <AuthGuard>
              <StudentList />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/trainer-list',
          element: (
            <AuthGuard>
              <TraineeList />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/contact-us',
          element: (
            <AuthGuard>
              <ContactUs />
            </AuthGuard>
          ),
        },
        {
          path: '/admin/trainer-videos/:phoneNumber',
          element: (
            <AuthGuard>
              <TrainerVideos />
            </AuthGuard>
          ),
        },
      ],
    },
    {
      path: '*',
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}


const NotFound = Loadable(lazy(() => import('../pages/404/Page404')));


/* Admin routes */

const Login = Loadable(lazy(() => import('../pages/Admin/LoginForms/Login')));

const Dashboard = Loadable(
  lazy(() => import('../pages/Admin/Dashboard/Dashboard'))
);


const StudentList = Loadable(
  lazy(() => import('../pages/Admin/StudentList/StudentList'))
);

const TraineeList = Loadable(
  lazy(() => import('../pages/Admin/TraineeList/TraineeList'))
);


const ContactUs = Loadable(
  lazy(() => import('../pages/Admin/ContactUs/ContactUs'))
);


const TrainerVideos = Loadable(
  lazy(() => import('../pages/Admin/TrainerVideos/TrainerVideos'))
);


