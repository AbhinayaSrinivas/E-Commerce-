import logo from './logo.svg';
import './App.css';
import Category from './Category';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  let [finalcat, setfinalcat] = useState([])
  let [finalpro, setfinalpro] = useState([])
  let [catname, setcatName] = useState('')
  let getCategory = () => {
    axios.get('https://dummyjson.com/products/categories')
    .then((res)=>res.data)
    .then((final)=>{
      setfinalcat(final)
    })
  }
  let getProduct = () => {
    axios.get('https://dummyjson.com/products')
      .then((prores) => prores.data.products)  // Adjusted to access the 'products' property
      .then((finalProRes) => setfinalpro(finalProRes));
  };
  
  useEffect(()=>{
    getCategory();
    getProduct();
  },[])
  useEffect(() => {
    if (catname.slug !== "") {
      axios.get(`https://dummyjson.com/products/category/${catname.slug}`)
        .then((prores) => prores.data.products)
        .then((finalProRes) => {
          setfinalpro(finalProRes);
        })
        .catch((error) => {
          console.error("Error fetching category products:", error);
        });
    }
  }, [catname]);
  let pitems = finalpro.map((v, i) => {
    return (
      <ProductItem key={i} pdata={v} />  
    );
  });
  return (
    <div className="App">
    <div className='py-[40px]'>
      <div className='max-w-[1320px] mx-auto'>
        <h1 className='text-center text-[40px] font-bold mb-[30px]'>Our Products</h1>
        <div className='grid grid-cols-[30%_auto] gap-[20px]'>
          <div>
            <Category finalcat={finalcat} setcatName={setcatName}/>
          </div>
          <div className='grid grid-cols-3 gap-5'>
            {
              finalpro.length >= 1 ?
              pitems:
              'No Product Found'
            }
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;

function ProductItem({pdata}){
  return(
    <div className='shadow-lg text-center pb-4 h-auto'>
        <img src={pdata.thumbnail} className='w-[100%] h-[220px]'/>
        <h4> {pdata.title} </h4>
        <b>Rs.{pdata.price} </b> 
    </div>
  )
}
