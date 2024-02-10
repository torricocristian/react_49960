
import {useState,useEffect} from 'react'
import { Product } from '../../components/Product';
import Title from '../../components/Title';
import '../../assets/styles/pages/PageListProduct.scss';
import { getDocs, collection, getFirestore } from 'firebase/firestore';


const PageListProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=>{

    const db = getFirestore() //instanciamos

    const productsCollection = collection(db, 'items') //declaramos collection

    getDocs(productsCollection)
        .then( snapshot => {
            const dataExtraida = snapshot.docs.map(datos => datos.data())
            setProducts(dataExtraida);
        })                

  },[]);


  return (
      <main>
          <section className='featured-products'>
              <div className="container">
                  <h2>
                      <Title title="Listado de productos" type="primary"/>         
                  </h2>
                  <div className="row">
                      {
                          products.map(product => <Product key={product.id} product={product}></Product>)
                      }
                  </div>
              </div>
          </section>
      </main>
        
  )
}

export default PageListProduct