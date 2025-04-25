import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import '../pages.css';

const NewFlat = () => {
  return (
    <div className="page-wrapper">
      <div>
        <Header />
      </div>
      <main>
        <p>Aqui va el contenido de new flat</p>
      </main>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default NewFlat;