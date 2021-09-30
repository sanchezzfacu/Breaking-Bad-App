import React  from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCharacters, filterCharactersByStatus, filterCreated } from '../actions';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import '../styles/Home.css'

export default function Home() {
    
    const dispatch = useDispatch()
    const allCharacters = useSelector((state) => state.characters)
    // const [orden, setOrden]= useState('')
    const [currentPage,setCurrentPage] = useState(1);
    const [charactersPerPage]= useState(6);
    const indexOfLastCharacter = currentPage * charactersPerPage; //6
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage; //0
    const currentCharacters = allCharacters.slice(indexOfFirstCharacter,indexOfLastCharacter)

    useEffect(() => {
        dispatch(getCharacters())
    },[dispatch]) 

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
      }; 

    function handleClick(e) {
        e.preventDefault();
        dispatch(getCharacters())
    }

    function hanldeFilterStatus(e) {
        dispatch(filterCharactersByStatus(e.target.value))
    }

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    }

    return (
        <>     
            <div className="header">
                <Link to='/characters'>Crear personaje</Link>
                <button onClick={e => {handleClick(e)}}>Refresh</button>
            </div>    
            <div className="background">
                <div className="align">
                    <div className="options">
                        <select>
                            <option value="asc">Ascendente</option>
                            <option value="desc">Descendente</option>
                        </select>
                        <select onChange={e => hanldeFilterStatus(e)}>
                            <option value="All">Todos</option>
                            <option value="DEA agent">DEA</option>
                            {/* <option value="Deceased">Muerto</option>
                            <option value="Unknown">Desconocido</option>
                            <option value="Presumed dead">Problablemente muerto</option> */}
                        </select>
                        <select onChange={e => handleFilterCreated(e)}>
                            <option value="All">Todos</option>
                            <option value="created">Creados</option>
                            <option value="api">Existentes</option>
                        </select>    
                    </div>        
                    <div className="search">    
                        <SearchBar/>
                    </div>   
                </div>    
                    <div className="div-home">          
                        {
                        currentCharacters?.map(el => {
                            return(
                                <div className="card">
                                    <Link to='/home/'>
                                        <Card name={el.name} image={el.image? el.image : el.img} nickname={el.nickname} occupation={el.occupation}/>
                                    </Link>    
                                </div>    
                                )
                            })
                        }
                    </div>
                <div className="paginado">
                        <Paginado 
                                charactersPerPage={charactersPerPage}
                                allCharacters={allCharacters.length}
                                paginado={paginado}
                        />  
                </div>        
            </div>            
        </>
    )
}