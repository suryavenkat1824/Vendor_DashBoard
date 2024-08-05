import React, { useState } from 'react'
import { useActionData } from 'react-router-dom';
import { API_URL } from '../../data/apiPath';
import {  toast } from 'react-toastify';

const AddFirm = () => {
const[firmName,setFirmName]=useState("");
const [area,setArea]=useState("");
const [category,setCategory]=useState([]);
const [region,setRegion]=useState([]);
const [offer,setOffer]=useState("");
const [file,setFile]=useState(null);

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

const handleRegionChange =(event)=>{
  const value=event.target.value;
  if(region.includes(value))
  {
    setRegion(region.filter((item)=> item!== value))
  }
  else
  {
    setRegion([...region,value])
  }
}

const handleImageUpload=(event)=>{
  const selectedImage=event.target.files[0];
  setFile(selectedImage);
}

const handleFirmSubmit= async(e)=>{
  e.preventDefault();
  try {
    const loginToken=localStorage.getItem('loginToken');
    if(loginToken)
    {
      console.error("User not authenticated");
    }

    const formData=new FormData();
    formData.append('firmName',firmName);
    formData.append('area',area);
    formData.append('offer',offer);
    formData.append('image',file)
    category.forEach((value)=>{
     formData.append('category',value);
    });
    region.forEach((value)=>{
      formData.append('region',value);
    });

  const response =await fetch(`${API_URL}/firm/add-firm`,{
    method:'POST',
    headers:{
      'token': `${loginToken}`
    },
    body:formData
  });
  const data=await response.json()
  if(response.ok)
  {
  console.log(data);
  toast.success(`${firmName} Added Succesfully`)
    setFirmName("")
    setArea("")
    setCategory([])
    setOffer("")
    setRegion([])
    setFile(null)
  //alert("Firm Added Successfully")
  // toast.success("Firm Added Successfully")
  console.log("firmId:",data.firmId)
  const firmId=data.firmId;
  localStorage.setItem('firmId',firmId)
  }
  else if(data.message=== "vendor can only have one firm")
  {
   // alert("Firm already exists.Only 1 firm can be added")
   toast.error(` Failed to add ${firmName}`)
    // toast.error("Firm already exists for User")
    toast.info("Only 1 firm can be added for User")
  }
  else{
   // alert("Failed to add Firm");
    toast.error("Failed to add Firm")
  }
  
  } catch (error) {
     console.error("Failed to add firm");
     toast.error("Failed to add firm")
     toast.info(`${error}`)
  }
}

  return (
    <div className='firmSection'>
        <form className='tableForm' onSubmit={handleFirmSubmit}>
        <h3>Add Firm</h3>
            <label>Firm Name</label>
            <input type='text' name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)}/>
            <label>Area</label> 
            <input type='text' name='area' value={area} onChange={(e)=>setArea(e.target.value)}/>
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
                <input type='checkbox' value="non-veg" checked={category.includes("non-veg")} onChange={handleCategoryChange} ></input>
              </div>
            </div>
            </div>
            {/* <label>Region</label>
            <input type='text'/> */}
           
            <label>Offer</label>
            <input type='text' name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)}/>
          


            <div className='checkInp'>
              <label>Region</label>
            <div className='inputsContainer'>
            <div className='regBoxContainer'>
                <label>South Indian</label>
                <input type='checkbox' value="South-Indian" checked={region.includes('South-Indian')} onChange={handleRegionChange} ></input>
              </div>
              <div className='regBoxContainer'>
                <label>North Indian</label>
                <input type='checkbox' value="North-Indian" checked={region.includes('North-Indian')} onChange={handleRegionChange}></input>
              </div>
              <div className='regBoxContainer'>
                <label>Chinese</label>
                <input type='checkbox' value="Chinese" checked={region.includes('Chinese')} onChange={handleRegionChange}></input>
              </div>
              <div className='regBoxContainer'>
                <label>Bakery</label>
                <input type='checkbox' value="Bakery" checked={region.includes('Bakery')} onChange={handleRegionChange}></input>
              </div>
            </div>
            </div>

            <label>Firm image</label>
            <input type='file' onChange={handleImageUpload} />

             <br></br>
        <div className='btnSubmit'>
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddFirm