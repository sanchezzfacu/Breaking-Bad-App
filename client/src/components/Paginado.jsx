import React from 'react'

export default function Paginado({charactersPerPage, allCharacters, paginado}) {
    const pageNumbers = []

    for(let i = 0; i <= Math.ceil(allCharacters/charactersPerPage); i++) {
        pageNumbers.push(i+1)
    }
    return (
        <nav>
            <ul>
                   {
                    pageNumbers?.map( number => 
                        <li>
                            <a href onClick={() => paginado(number)}><button className="btn_paginado">{number}</button></a>
                        </li>
                    )
                    }
            </ul>
        </nav>
    )
} 