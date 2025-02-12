// src/modules/Home/Home.tsx
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ProductsList from '../Products/pages/ProductsList';

const Home = () => {
  return (
    <div className='w-full flex flex-col items-center gap-5'>
      <h1 className='text-2xl font-bold'>Welcome to the Product Management System</h1>
      <div className='w-full'>
        <ProductsList fromHome />
      </div>
      <Button className='w-fit'>
        <Link to="/products">View all Products</Link>
      </Button>
    </div>
  );
};

export default Home;
