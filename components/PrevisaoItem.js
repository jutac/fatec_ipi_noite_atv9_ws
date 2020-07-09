import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const PrevisaoItem = (props) => {
  const sunrise = new Date(props.previsao.sunrise*1000);
  const sunset = new Date(props.previsao.sunset*1000);
  
  return (
    <View style={estilos.cartao}>
        <View style={{...estilos.primeiraLinha, ...{alignItems: 'center'}}}>
            <Text style={estilos.data}>
                {new Date(props.previsao.dt*1000).toLocaleDateString()}
            </Text>
        </View>
        <View style={estilos.primeiraLinha}>
            <Text>
                Nascer do Sol às {('00'+((sunrise.getUTCHours() +24+ props.timezone/3600)%24).toString()).slice(-2)}:{("00"+sunrise.getMinutes().toString()).slice(-2)}
            </Text>
        </View>
        <View style={estilos.primeiraLinha}>
            <Text>
                {/* Pôr do Sol às {sunset.getUTCHours()+24} + {props.timezone/3600}:{("00"+sunset.getMinutes().toString()).slice(-2)} */}
                Pôr do Sol às {('00'+((sunset.getUTCHours() +24+ props.timezone/3600)%24).toString()).slice(-2)}:{("00"+sunset.getMinutes().toString()).slice(-2)}
            </Text>
        </View>
        <View style={estilos.tela}>
            <Image
                style={estilos.imagem}
                source={{ uri: 'https://openweathermap.org/img/wn/' + props.previsao.weather[0].icon + '.png'}}
            />
            <View style={estilos.segundaLinha}>
                <Text style={estilos.valor}>
                    Dia: {Math.round(props.previsao.feels_like.day - 273.15)} °C
                </Text>
                <Text style={estilos.valor}>
                    Manhã: {Math.round(props.previsao.feels_like.morn - 273.15)} °C
                </Text>
                <Text style={estilos.valor}>
                    Tarde: {Math.round(props.previsao.feels_like.eve - 273.15)} °C
                </Text>
                <Text style={estilos.valor}>
                    Noite: {Math.round(props.previsao.feels_like.night - 273.15)} °C
                </Text>
            </View>
        </View>
    </View>
  );
}
const estilos = StyleSheet.create({
    cartao: {
        marginBottom: 10,
        // alignItems:'center',
        elevation: 4,
        backgroundColor: '#cce6ff',
        padding: 12,
        borderRadius: 12,
    },
    tela: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        width: "100%",
        borderTopWidth: 2,
        borderTopColor: "#FFF"
    },
    imagem: {
        width: 50,
        height: 50,
        justifyContent: 'center',
    },
    primeiraLinha: {
        marginVertical: 2,
    },
    segundaLinha: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: 4,
    },
    valor: {
        // marginHorizontal: 2,
    },
    data: {
        color: "#0f800b",
        fontWeight: 'bold',
        fontSize: 18,
    }
});

export default PrevisaoItem;