import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath';
import {  toast } from 'react-toastify';

const AddProduct = () => {

   const [productName,setProductName]=useState("")
   const [price,setPrice]=useState("")
   const [category,setCategory]=useState([])
   const [bestSeller,setBestSeller]=useState(false);
   const [image,setImage]=useState(null)
   const [description,setDescription]=useState("")
  

   const handleCategoryChange =(event)=>{
    const value=event.target.value;
    if(category.includes(value))
    {
      setCategory(category.filter((item)=> item!== value))
    }
    else
    {
      setCategory([...category,value])
    }
  }
   const handleBestSeller =(event)=>{
       const value=event.target.value === 'true';
       setBestSeller(value)
       
   }
   const handleImageUpload=(event)=>{
    const selectedImage=event.target.files[0];
    setImage(selectedImage);
  }

   const handleAddProduct =async(e)=>{
      e.preventDefault();
      try {
        const loginToken=localStorage.getItem('loginToken'); 
        const firmId=localStorage.getItem('firmId')
        if(!loginToken || !firmId)
        {
          console.log("User not Authenticated");
        }
        const formData=new FormData();
        formData.append('productName',productName);
        formData.append('price',price);
        formData.append('description',description);
        formData.append('image',image);
        category.forEach((value)=>{
          formData.append('category',value);
         });
         
         const response =await fetch(`${API_URL}/product/add-product/${firmId}`,{
         method:'POST',
         body:formData
         })

        // const data= await response.json();
         if(response.ok){
          console.log("Product Added Succesfully")
          setProductName("")
          setPrice("")
          setBestSeller(false)
          setCategory([])
          setDescription("")
          setImage(null)
         // alert("Product Added Successfully")
          toast.success( `${productName} Added Successfully`)
         }


      } catch (error) {
         toast.error("Failed to add Product");
         toast.info(`${error}`)
        //alert('Failed to add product')
      }
   }
  return (
    <div className='firmSection'>
        <form className='tableForm' onSubmit={handleAddProduct}>
        <h3>Add Product</h3>
            <label>Product Name</label>
            <input type='text' value={productName} onChange={(e)=>setProductName(e.target.value)}/>
            <label>Price</label> 
            <input type='text' value={price} onChange={(e)=>setPrice(e.target.value)}/>
            {/* <label>Category</label>
            <input type='text'/> */}

            <div className='checkInp'>
              <label>Category</label>
            <div className='inputsContainer'>
            <div className='checkboxContainer'>
                <label>Veg</label>
                <input type='checkbox' value="veg" checked={category.includes('veg')} onChange={handleCategoryChange}></input>
              </div>
              <div className='checkboxContainer'>
                <label>Non-Veg</label>
                <input type='checkbox' value="non-veg" checked={category.includes('non-veg')}  onChange={handleCategoryChange}></input>
              </div>
            </div>
            </div>




            <div className='checkInp'>
              <label>Best Seller</label>
            <div className='inputsContainer'>
            <div className='checkboxContainer'>
                <label>Yes</label>
                <input type='radio' value="true" checked={bestSeller=== true}  onChange={handleBestSeller}></input>
              </div>
              <div className='checkboxContainer'>
                <label>No</label>
                <input type='radio' value="false" checked={bestSeller=== false}  onChange={handleBestSeller}></input>
              </div>
            </div>
            </div>

            {/* <label>Best Seller</label>
            <input type='text'/> */}
            <label>Description</label>
            <input type='text' value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <label>Firm image</label>
            <input type='file' onChange={handleImageUpload}/>
             <br></br>
        <div className='btnSubmit'>
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct