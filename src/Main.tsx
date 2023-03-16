import { Routes, Route } from "react-router-dom";
import AirQuality from "src/components/AirQuality";
import ProductSales from "src/components/ProductSales";
import HdbVisualisation from "src/components/hdb";
import HdbScatter from "src/components/hdbScatter";

const Main = () => {
  return (
    <Routes>
      <Route path="/airquality" element={<AirQuality />} />
      <Route path="/productsales" element={<ProductSales />} />
      <Route path="/hdb-lines" element={<HdbVisualisation />} />
      <Route path="/hdb-scatter" element={<HdbScatter />} />
    </Routes>
  );
};
export default Main;
