
import {useState,useEffect} from 'react'
import { Product } from '../../components/Product';
import Title from '../../components/Title';
import '../../assets/styles/pages/PageListProduct.scss';
import { getDocs, collection, getFirestore, query, where } from 'firebase/firestore';


const PageListProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('todos');

//   useEffect(()=>{

//     const db = getFirestore() //instanciamos

//     const productsCollection = collection(db, 'items') //declaramos collection

//     getDocs(productsCollection)
//         .then( snapshot => {
//             const dataExtraida = snapshot.docs.map(datos => datos.data())
//             setProducts(dataExtraida);
//         })                

//   },[]);



  //Nosotros necesitamos, que al cambiar el valor de la categoria, tambien se actulice los productos
  useEffect(()=>{

    //Necesitamos llamar a firestore y traer todas las gorras 
    const db = getFirestore();
    

    //Devolver todos o solo devolver el valor de la categoria
    if(category == 'todos'){

        var q = query(
            collection(db, 'items')
        )

    }else{

        var q = query(
            collection(db, 'items'),
            where('categoria', '==', category)
        )

    }

    getDocs(q)
        .then( snapshot => {
            const dataExtraida = snapshot.docs.map(datos => datos.data())
            setProducts(dataExtraida);
        })



  },[category])


  return (
      <main>
          <section className='featured-products'>
              <div className="container">
                  <h2>
                      <Title title="Listado de productos" type="primary"/>         
                  </h2>

                  <div className="row">
                    <select name="categories" id="categories" value={category} onChange={
                        (event) => {
                            setCategory(event.target.value) // <-- setCategory('gorras')
                        }
                    } 
                    
                    
                        style={
                            {
                                marginBottom: '40px',
                                height: '30px'
                            }
                        }
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