import { Routes, Route } from 'react-router-dom';
import AirQuality from 'src/components/AirQuality';
import ProductSales from 'src/components/ProductSales';

const Main = () => {
return (         
    <Routes>
    <Route path='/airquality' element={<AirQuality/>} />
    <Route path='/productsales' element={<ProductSales/>} />
  </Routes>
);
}
export default Main;