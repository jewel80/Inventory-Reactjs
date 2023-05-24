import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import InventoryLayout from "../components/Layout/InventoryLayout";
import BlockedRoute from "./BlockedRoute";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import SendEmail from "../pages/Auth/SendEmail";
import ResetPassword from "../pages/Auth/ResetPassword";
import UserTypes from "../pages/Users/Types/UserTypes";
import UserTypeAdd from "../pages/Users/Types/UserTypeAdd";
import UserList from "../pages/Users/Users/UserList";
import UserCreate from "../pages/Users/Users/UserCreate";
import RoleList from "../pages/AdminSettings/Role/RoleList";
import WarehouseList from "../pages/Settings/Warehouse/WarehouseList";
import MenuList from "../pages/AdminSettings/Menu/MenuList";
import AddMenu from "../pages/AdminSettings/Menu/AddMenu";
import PermissionList from "../pages/AdminSettings/MenuPermission/PermissionList";
import AddPermission from "../pages/AdminSettings/MenuPermission/AddPermission";

const RouterProvider = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" exact={true} element={<NotFound />} />
        <Route
          path={"/login"}
          element={
            <BlockedRoute>
              <Login />
            </BlockedRoute>
          }
        />
        <Route
          path={"/send-email"}
          element={
            <BlockedRoute>
              <SendEmail />
            </BlockedRoute>
          }
        />
        <Route
          path={"/reset-password"}
          element={
            <BlockedRoute>
              <ResetPassword />
            </BlockedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <InventoryLayout></InventoryLayout>
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path={"/users/"}>
            <Route index element={<UserList />} />
            <Route path="add" element={<UserCreate />} />
            <Route path="edit/:id" element={<UserCreate />} />
            <Route path={"type/"}>
              <Route index element={<UserTypes />} />
              <Route path="add" element={<UserTypeAdd />} />
              <Route path="edit/:id" element={<UserTypeAdd />} />
            </Route>
          </Route>
          <Route path={"/role-menu/settings/"} >
            <Route path={"roles/"}>
              <Route index element={<RoleList />}/>
            </Route>
            <Route path={"menus/"}>
              <Route index element={<MenuList />}/>
              <Route path={"add"} element={<AddMenu />}/>
              <Route path={"edit/:id"} element={<AddMenu />}/>
            </Route>
            <Route path={"menu-permission/"}>
              <Route index element={<PermissionList />}/>
              <Route path={"add"} element={<AddPermission />}/>
              <Route path={"edit/:id"} element={<AddPermission />}/>
            </Route>
          </Route>
          <Route path={"/settings/"} >
            <Route path={"warehouses/"}>
              <Route index element={<WarehouseList />}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default RouterProvider;