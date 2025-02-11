// src/modules/Home/Home.tsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Product Management System</h1>
      <Link to="/products">View Products</Link>
    </div>
  );
};

export default Home;
