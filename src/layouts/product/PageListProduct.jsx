
import {useState,useEffect } from 'react';
import { getDocs, collection, getFirestore, query, where } from 'firebase/firestore';

import { Product } from '../../components/Product';
import Title from '../../components/Title';
import '../../assets/styles/pages/PageListProduct.scss';
import '../../assets/styles/forms.scss';



const PageListProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('todos');

  //Nosotros necesitamos, que al cambiar el valor de la categoria, tambien se actulice los productos
  useEffect(()=>{

    //Necesitamos llamar a firestore y traer todas las gorras 
    const db = getFirestore();
    
    //Operador ternario 
    var q = (category == 'todos') ? query( collection(db, 'items') ) : query( collection(db, 'items'), where('categoria', '==', category) );

    getDocs(q)
        .then( snapshot => {
            const dataExtraida = snapshot.docs.map(datos => datos.data())
            setProducts(dataExtraida);
        })

  },[category])


  const handleSelect = (event) => {
    setCategory(event.target.value)
  }

  return (
      <main>
          <section className='featured-products'>
              <div className="container">
                  <h2>
                      <Title title="Listado de productos" type="primary"/>         
                  </h2>

                  <div className="row">
                    <select className="filtroCategoria" name="categories" id="categories" value={category} onChange={handleSelect} 
                    >
                        <option value="todos">Todos</option>
                        <option value="zapatillas">Zapatillas</option>
                        <option value="gorras">Gorras</option>
                    </select>
                  </div>

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