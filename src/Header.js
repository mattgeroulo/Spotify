import React from "react";
import "./Header.css"
import  { useState } from "react";

export default function Header(){
    const[query,setQuery]=useState("")

    const handleSubmit = (e)=>{
        setQuery(e.target.value);
    };
    const handleChange =(e)=>{
        e.preventDefault();
        /*call api here */
    }
    



    return(
        <div className="header">
            <h1 className="mainTitle">Bump'n</h1>
            <form className="inputBar" onSubmit ={handleSubmit}>
                <input type="text" value={query}  className="searchInput" placeholder="Search an artist" onChange={handleChange}/>
                <button type="submit" className="searchButton">Search</button>
                

            </form>
        </div>
    )
}