import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Button } from 'react-native';
import PrevisaoItem from './components/PrevisaoItem';

export default function App() {
  const apiKey = "";

  const [busca, setBusca] = useState('');
  const [cidade, setCidade] = useState({});
  const [previsoes, setPrevisoes] = useState([]);

  const obterLatLon = () => {
    const endPoit = "https://api.openweathermap.org/data/2.5/forecast?lang=pt&units=metric&q=";
    const target = endPoit + busca + '&appid=' + apiKey;
    fetch(target) //consumir web service, requisicao asincrona que retorna um objeto Response
      .then(dados => dados.json()) //pegar um json que esta no corpo do Response
      .then(dados => setCidade(dados["city"])); //atribuir a variavel
  }

  useEffect(() => {
    if (cidade?.coord?.lat && cidade?.coord?.lon) {
      const endPoit = "https://api.openweathermap.org/data/2.5/onecall?lat=";
      const target = endPoit + cidade.coord.lat + "&lon=" + cidade.coord.lon + "&exclude=current,minutely,hourly&appid=" + apiKey;
      fetch(target).then(dados => dados.json()).then(dados => setPrevisoes(dados.daily));
    }
  }, [cidade]);

  return (
    <View style={styles.container}>
      <View style={styles.entrada}>
        <TextInput
          style={styles.nomeCidade}
          placeholder="Digite o nome de uma cidade" 
          onChangeText={(digitado => setBusca(digitado))}
        />
        <Button title="OK" onPress={obterLatLon} />
      </View>
      <FlatList
        data={previsoes}
        renderItem={
          previsao => <PrevisaoItem previsao={previsao.item} timezone={cidade.timezone}></PrevisaoItem>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  nomeCidade: {
    padding: 10,
    borderBottomColor: "#BB96F3",
    borderBottomWidth: 2,
    textAlign: 'left',
    marginBottom: 4,
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 40,
  },
  entrada: {
    marginBottom: 10
  }
});
