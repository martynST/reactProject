//funcitonal component -> returns HTML, doesn't hav constructors or vars
import React from 'react';

const pokemon = (props) => {
    if (props.toUpdate) {
        return (
            <tr>
                <td>
                    {props.updateName}
                </td>
                <td>
                    {props.updateLevel}
                </td>
                <td>
                    {props.updateEggGroup}
                </td>
                <td> <button onClick={props.deletePokemon}> Release </button> </td>
                <td> {props.updateSubmit} </td>
            </tr>
        )
    } else {
        return (
            <tr>
                <td>{props.name}</td>
                <td>{props.level}</td>
                <td>{props.eggGroup}</td>
                <td> <button onClick={props.deletePokemon}> Release </button> </td>
                <td> <button onClick={props.updatePokemon}> Update </button> </td>
            </tr>
        )
    }
}

export default pokemon;