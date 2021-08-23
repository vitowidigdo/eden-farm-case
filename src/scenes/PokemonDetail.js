import React, { useContext, useEffect, useState } from 'react'
import { View, Text,Button, TouchableOpacity,StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import {ThingsContext} from '../contexts/DetailedItem';

const PokemonDetail = ({ route, navigation }) => {
  const {state, dispatch} = useContext(ThingsContext)
  const { id } = route.params;
  const [detailResponse, setResponse] = useState(null)

  useEffect(() => {
    axios.get(id)
      .then((response) => {
        setResponse(response.data)
      })
      .catch((error) => {
        console.log({error});
    });
  }, []);

  const detailPokemon = () => {
    dispatch({
      type: 'POKEMONS_DETAILS',
      details: {
        data: detailResponse,
      }
    })
  }

  return(
    <View>
      <TouchableOpacity style={styles.textBlueContainer} onPress={() => detailPokemon()}>
        <Text style={styles.textBlue}>
          See pokemon Abilities, Forms,
        </Text>
      </TouchableOpacity>
      <ScrollView style={{height: 400}}>
        <View style={styles.textForm}>
          <Text style={styles.textGrey}>
            Abilities
          </Text>
        </View>
        {state?.details?.[0]?.abilities?.map((detail, index) => (
          <View key={index} style={styles.buttonItem}>
            <Text style={styles.textBlue}>
              {detail.ability.name}
            </Text>
          </View>
        ))}
        <View style={styles.textForm}>
          <Text style={styles.textGrey}>
            Forms
          </Text>
        </View>
        {state?.details?.[0]?.forms?.map((detail, index) => (
          <View key={index} style={styles.buttonItem}>
            <Text style={styles.textBlue}>
              {detail.name}
            </Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.textBlueContainer} onPress={() => navigation.navigate('Pokemon Lists')}>
        <Text style={styles.textBlue}>
          Go to Home
        </Text>
      </TouchableOpacity>
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
    height: 40,
    marginVertical: 10,
    justifyContent: 'center',
  },
  textForm: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 30,
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

export default PokemonDetail
