import React,{useEffect,useState, useContext} from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native'
import {ThingsContext} from '../contexts/DetailedItem';
import axios from 'axios';

const Home = ({ navigation }) => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=200`;
  const url2 = `https://pokeapi.co/api/v2/item/`;
  const [listItems, setListItems] = useState(null);

  const [listPokemon, setListPokemon] = useState([]);

  const [selected, setSelected] = useState(null);
  
  const { state, dispatch } = useContext(ThingsContext);

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setListPokemon(response.data.results)
      })
      .catch((error) => {
        console.log({error});
    });

    axios.get(url2)
    .then((response) => {
        setListItems(response?.data.results)
      })
    .catch((error) => {
      console.log({error});
    });
  }, []);

  const updateList = () => {
    dispatch({
      type: 'LIST_POKEMONS',
      pokemon: {
        data: listPokemon,
      }
    })
  }

  const updateItems = () => {
    dispatch({
      type: 'LIST_ITEMS',
      item: {
        data: listItems,
      }
    })
  }

  return (
    <View>
      <Text style={styles.textBlue}>List of Pokemon</Text>
      <TouchableOpacity style={styles.buttonItem} onPress={() => {
        updateList();
        setSelected('pokemon');
      }}>
        <Text>
          Click to see List of Pokemon!
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonItem} onPress={() => {
        updateItems();
        setSelected('item')
      }}>
        <Text>
          Click to see List of Items!
        </Text>
      </TouchableOpacity>
      <ScrollView style={{height: 400}}>
        {selected === 'pokemon' && state?.pokemons?.[0]?.map((data,index) => {
          return(
            <TouchableOpacity key={index} style={(index === state?.pokemons?.[0]?.length-1) ? styles.marginLastChild : styles.textBlueContainer}
              onPress={() => {
                navigation.navigate('Pokemon Detail', {
                  id: data.url,
                });
              }}
            >
              <Text style={styles.textGrey}>
                {data.name}
              </Text>
            </TouchableOpacity>
          )
        })}
        {selected === 'item' && state?.items?.[0]?.map((data,index) => {
          return(
            <View key={index} style={(index === state?.items?.[0]?.length-1) ? styles.marginLastChild : styles.textBlueContainer}>
              <Text style={styles.textGrey}>
                {data.name}
              </Text>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  textBlueContainer: {
    borderWidth: 1,
    borderRadius: 24,
    height: 48,
    marginTop: 25,
    justifyContent: 'center',
  },
  marginLastChild: {
    marginTop: 25,
    marginBottom: 30,
    borderWidth: 1,
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
  },
  textGreyContainer: {
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.24)',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
  },
  textBlue: {
    color: '#6582c0',
    fontSize: 15,
    alignSelf: 'center',
    marginVertical: 10,
  },
  textGrey: {
    color: '#36454f',
    fontSize: 15,
    alignSelf: 'center',
  },
});

export default Home
