import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import '../pages.css';

const Home = () => {
  return (
    <div className="page-wrapper">
      <div>
        <Header />
      </div>
      <div>
        <p>Aqui va el contenido de home</p>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Home;