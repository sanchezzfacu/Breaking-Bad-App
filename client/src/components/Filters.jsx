import React from 'react'
import { useDispatch } from 'react-redux'
import { filterCharactersByStatus, filterCreated } from '../actions'

function Filters() {

    const dispatch = useDispatch()
    

    function hanldeFilterStatus(e) {
        dispatch(filterCharactersByStatus(e.target.value))
    }

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    }
    return (
        <div>
            <select>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>
            <select onChange={e => hanldeFilterStatus(e)}>
                <option value="All">Todos</option>
                <option value="Deceased">Muerto</option>
                <option value="Unknown">Desconocido</option>
                <option value="Presumed dead">Problablemente muerto</option>
            </select>
            <select onChange={e => handleFilterCreated(e)}>
                <option value="All">Todos</option>
                <option value="created">Creados</option>
                <option value="api">Existentes</option>
            </select>    
        </div>
    )
}

export default Filters
