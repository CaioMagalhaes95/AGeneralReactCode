import { ReactElement } from "react";

import { Route, Routes } from "react-router-dom";
import React from "react";
import  { BarChart } from "./pages/DashboardPage";
import { ListUser } from "./pages/UserPage";

export function AppRouting(): ReactElement{
    return (
        <Routes>
     

            <Route path="/users" element={<ListUser />}/>
        </Routes>
    );
}