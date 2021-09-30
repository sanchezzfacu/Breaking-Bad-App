import React  from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCharacters } from '../actions';
import Card from './Card';
import Filters from './Filters';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import '../styles/Home.css'
import logo from '../imagenes/bb.png'

export default function Home() {
    const dispatch = useDispatch()
    const allCharacters = useSelector((state) => state.characters)
    // const [orden, setOrden]= useState('')
    const [currentPage,setCurrentPage] = useState(1);
    const [charactersPerPage]= useState(8);
    const indexOfLastCharacter = currentPage * charactersPerPage; //6
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage; //0
    const currentCharacters = allCharacters.slice(indexOfFirstCharacter,indexOfLastCharacter)

    useEffect(() => {
        dispatch(getCharacters())
    },[dispatch]) 

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
      }; 

    const refreshPage = () => {
        dispatch(getCharacters())
    }

    return (
        <div className="background">    
            <nav>
                <Link onClick={refreshPage} to="/home"><img className="logo" src={logo} alt="" height="70px"/></Link>
                <Filters />
                <SearchBar/>
                <Link className="crear_personaje" to='/characters'><button>Crear personaje</button></Link>
            </nav>            
            <div>
            <div className="card_container">
                {
                currentCharacters?.map(el => {

                    return(
                        <div className="card">
                            <Card name={el.name} image={el.image? el.image : el.img} nickname={el.nickname} occupation={el.occupation}/>
                        </div>
                    )
                })
                }
            </div>    
            </div>
                <Paginado
                charactersPerPage={charactersPerPage}
                allCharacters={allCharacters.length}
                paginado={paginado}
            />  
        </div>
    )
}