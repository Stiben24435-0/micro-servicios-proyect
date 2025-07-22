import './App.css'
import Crud from './Crud.jsx';
import CrudIngresos from './CrudIngresos.jsx';

function App() {

   return (
    <div>
      <h1 className='text-3xl'>Inventario de Productos</h1>
      <Crud/>
      <h1 className='font-bold'>Inventario de Ingresos</h1>
      <CrudIngresos/>
    </div>
  );
}
//   const [productos, setProductos] = useState([]);
//   const [ingresos, setIngresos] = useState([]);

//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/api/inventario/')
//       .then(res => setProductos(res.data))
//       .catch(err => console.error(err));

//     axios.get('http://127.0.0.1:8000/api/ingresos/')
//       .then(res => setIngresos(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div>
//       <h1>Inventario</h1>
//       <ul>
//         {productos.map(p => (
//           <li key={p.id}>
//           {p.nombre}-
//           {p.cantidad}-
//           {p.precio}
//            </li>
//         ))}
//       </ul>
        

//       <h1>Ingresos</h1>
//       <ul>
//         {ingresos.map(i => (
//           <li key={i.id}>{i.descripcion}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default App;
