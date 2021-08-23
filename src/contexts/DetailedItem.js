import React, {useReducer} from 'react'

const ThingsContext = React.createContext([[],() => {}])
// export const ThingsProvider = ThingsContext.Provider
const initialState = {
  items: [],
  pokemons: [],
  details: [],
}

let itemsReducer = (state = initialState, action) => {
  switch(action.type){
  case "LIST_ITEMS":
    return {
      ...state,
      items: [...state.items,action.item.data],
    }
  case "LIST_POKEMONS":
    return {
      ...state,
      pokemons: [...state.pokemons,action.pokemon.data],
    }
  case "POKEMONS_DETAILS":
    return {
      ...state,
      details: [...state.details, action.details.data],
    }
  default:
    return state
  }
}

function ThingsProvider(props) {

  const [state, dispatch] = useReducer(itemsReducer, initialState);

  return (
    <ThingsContext.Provider
      value={{state,dispatch}}
    >
      {props.children}
    </ThingsContext.Provider>
  );
}

export {
  ThingsContext,
  ThingsProvider
}
