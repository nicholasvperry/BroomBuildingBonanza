import React from "react"
import { Route, Routes } from "react-router-dom";
import { AdminList } from "./Admin/AdminList";
import { BroomBuilder } from "./BroomBuilder/BroomBuilder";
import { FinishedImage } from "./BroomImage/BroomImage";
import { NotesProvider } from "./Notes/NoteProvider";
import { OrdersProvider } from "./Orders/OrderProvider";
import { ProductList } from "./Products/ProductList";
import { StatusProvider } from "./Status/StatusProvider";
import { TailType } from "./TailType/TailType";
import { TailTypeForm } from "./TailType/TailTypeForm";
import { TailTypesProvider } from "./TailType/TailTypeProvider";
import { UserProvider } from "./Users/UserProvider";
import { WoodColor } from "./WoodColor/WoodColor";
import { WoodColorsProvider } from "./WoodColor/WoodColorProvider";
import { WoodType } from "./WoodType/WoodType";
import { WoodTypesProvider } from "./WoodType/WoodTypeProvider";
import { WoodColorForm } from "./WoodColor/WoodColorForm";
import { WoodTypeForm } from "./WoodType/WoodTypeForm";
import { OrderList } from "./Orders/OrderList";
import { OakFireBroom } from "./BroomImage/OakFireBroom";
import { TestModel } from "./BroomImage/TestImage";



//ApplicationViews renders the function based on the web address
export const ApplicationViews = () => {

  return  (
    
    <TailTypesProvider>
    <WoodColorsProvider>
    <WoodTypesProvider>
    <OrdersProvider>
    <NotesProvider>
    <UserProvider>
    <StatusProvider>
    <Routes>

      {/* Render the home page when http://localhost:3000/ */}
      <Route exact path="/" element={<BroomBuilder />} />
      
      {/* Render the home page when http://localhost:3000/ */}
      <Route exact path="/woodtype" element={<FinishedImage />} />
      
      {/* Render the projects page when http://localhost:3000/projects */}
      <Route exact path="/projects" element={<AdminList />} />
      
      {/* Render the products page when http://localhost:3000/products */}
      <Route exact path="/products" element={<ProductList />} />
      
      
      
      {/* Render the tailTypeForm page when http://localhost:3000/tailtypes/create */}
      <Route exact path="/tailtypes/create/*" element={<TailTypeForm />} />
      
      {/* Render the tailTypeForm page when http://localhost:3000/tailtypes/create */}
      <Route exact path="/tailtypes/edit/:tailTypeId/*" element={<TailTypeForm />} />
      
      
      {/* Render the woodTypeForm page when http://localhost:3000/woodtypes/create */}
      <Route exact path="/woodtypes/create/*" element={<WoodTypeForm />} />
      
      {/* Render the woodTypeForm page when http://localhost:3000/woodtypes/create */}
      <Route exact path="/woodtypes/edit/:woodTypeId/*" element={<WoodTypeForm />} />

      {/* Render the woodColorForm page when http://localhost:3000/woodcolors/create */}
      <Route exact path="/woodcolors/create/*" element={<WoodColorForm />} />
      
      {/* Render the woodcolorForm page when http://localhost:3000/woodcolors/create */}
      <Route exact path="/woodcolors/edit/:woodColorId/*" element={<WoodColorForm />} />
      
      
      {/* Render the orders page when http://localhost:3000/orders */}
      <Route exact path="/orders/*" element={<OrderList />} />



      


        
        
    </Routes>
    </StatusProvider>
    </UserProvider>
    </NotesProvider>
    </OrdersProvider>
    </WoodTypesProvider>
    </WoodColorsProvider>
    </TailTypesProvider>


     
    );
  }
