import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { ACTION_TYPE } from '../../store/Actions';
import {useFilter} from "../../store/data/FilterContext"
import { useNavigate } from "react-router-dom";
import {fiction, nonfiction, finance} from '../../assets/index'
function Body() {
    const {filterDispatch}=useFilter();
    const navigate=useNavigate();
    const categoryHandler=(categoryName)=>{
        navigate("/products")
        filterDispatch({type:ACTION_TYPE.CATEGORY,payload:categoryName})
    }
    
    return (
        <div>
            <div className="container">
        <section className="main">
            <div className="introduction"> 
                <h1>BookFactory</h1>
                <h3 className="doc-para">Immerse yourself in the captivating allure of literature</h3>
                <Link to="products" className="main-btn primary-btn">SHOP NOW</Link>
            </div>
        </section>
        <h1 className="text-center">Categories</h1>
        <section className="products">
            <div className="product fiction" onClick={()=>categoryHandler("fiction")}>
                <img src={fiction} alt=""/>
                <h3>Fiction</h3>
            
            </div>

            <div className="product non-fiction" onClick={()=>categoryHandler("non-fiction")}>
                <img src={nonfiction} alt="" height={500} />
                <h3>Non-Fiction</h3>
                
            </div>
            <div className="product finance" onClick={()=>categoryHandler("finance")}>
                <img src={finance} alt="" height={500} width='auto' />
                <h3>Finance</h3>
            </div>
        </section>
    </div>
        </div>
    )
}

export default Body
