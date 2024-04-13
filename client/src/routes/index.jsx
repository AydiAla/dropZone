import { createBrowserRouter } from "react-router-dom";
import MiniDrawer from "../home/MiniDrawer";
import Home from "../page/home";
import Team from "../page/team/Team";
import Dashboard from "../page/dashboard/Dashboard";
import Contacts from "../page/contacts/Contacts";
import Calendar from "../page/calendar/Calendar";
import PieChart from "../page/pieChart/PieChart";
import NotFound from "../page/notFound/NotFound";
import Invoices from "../page/invoices/Invoices";
import Geography from "../page/geography/Geography";
import Form from "../page/form/Form";
import FAQ from "../page/faq/FAQ";
import BarChart from "../page/barChart/BarChart";
import CreateCourse from "../components/AdminDashboard/Courses/CreateCourse";
import DeleteCourse from "../components/AdminDashboard/Courses/DeleteCourse";
import UpdateCourse from "../components/AdminDashboard/Courses/UpdateCourse";
import ReadCourse from "../components/AdminDashboard/Courses/ReadCourse";
import MainCourses from "../components/AdminDashboard/Courses/MainCourses";
import CreateCategories from "../components/AdminDashboard/Categories/CreateCategories";
import MainCategories from "../components/AdminDashboard/Categories/MainCategories";
import UpdateCategories from "../components/AdminDashboard/Categories/UpdateCategories";
import { CoursesInCategories } from "../components/AdminDashboard/Categories/CoursesInCategories";
import Login from "../components/Login/Login";
import Registre from "../components/Registre/Registre";
import ActivationPage from "../components/ActivationPage/ActivationPage";
// import HomeLogin from "../components/Login/HomeLogin";

//
export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  // {path:"/loginHome",element:<HomeLogin/>},
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Registre /> },
  { path: "/confirm/:activationCode", element: <ActivationPage /> },

  {
    element: <MiniDrawer />,
    children: [
      {
        path: "/dashboard", // Corrected path for Dashboard
        element: <Dashboard />,
      },
      {
        path: "/team",
        element: <Team />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },
      {
        path: "/pie",
        element: <PieChart />,
      },
      {
        path: "/notfound",
        element: <NotFound />,
      },
      {
        path: "/invoices",
        element: <Invoices />,
      },
      {
        path: "/geography",
        element: <Geography />,
      },
      {
        path: "/form",
        element: <Form />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/bar",
        element: <BarChart />,
      },

      {
        path: "/mainCourses",
        element: <MainCourses />,
      },
      {
        path: "/createCourse",
        element: <CreateCourse />,
      },

      {
        path: "/deleteCourse/:id",
        element: <DeleteCourse />,
      },
      {
        path: "/updateCourse/:id",
        element: <UpdateCourse />,
      },
      {
        path: "/readCourse/:courseId",
        element: <ReadCourse />,
      },
      {
        path: "/readCourse/get-files/files/file",
        element: <ReadCourse />,
      } , 
      {
        path: "/createCategory",
        element: <CreateCategories />,
      },
      {
        path: "/mainCategories",
        element: <MainCategories />,
      },
      {
        path: "/updateCategory/:id",
        element: <UpdateCategories />,
      },
      {
        path: "/cousesInCategories/:id",
        element: <CoursesInCategories />,
      },
    ],
  },
]);
