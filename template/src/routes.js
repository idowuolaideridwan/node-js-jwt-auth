// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Refunds from "layouts/refunds";
import Users from "layouts/users";
import Notifications from "layouts/notifications";
import SignIn from "layouts/authentication/sign-in";
import UpdateUser from "layouts/updateUser";
import LogOut from "layouts/logout";


// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Appointments",
    key: "tables",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/appointment",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Refunds",
    key: "refunds",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/refunds",
    component: <Refunds />,
  },
  {
    type: "collapse",
    name: "User Management",
    key: "users",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/users",
    component: <Users />,
  },
  {
    type: "collapse",
    name: "Locations",
    key: "notifications",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">Login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "",
    name: "Update User",
    key: "updateUser",
    route: "/updateUser/:id",
    component: <UpdateUser />,
  },
  {
    type: "collapse",
    name: "Log Out",
    key: "logout",
    icon: <Icon fontSize="small">logout</Icon>,
    route: "/logout",
    component: <LogOut />,
  },
];

export default routes;

