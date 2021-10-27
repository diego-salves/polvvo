import React from "react";
import { 
    View,
    Image,
    StyleSheet,
  } from 'react-native';

import {
    Container,
    Title,
    Introduction,
    ImageContainer,
    Button,
    ButtonContainer,
    ButtonText
} from './styles'

import { useAuth } from '../../hooks/auth';

import google from '../../assets/google.png';
import logo from '../../assets/icon_Polvvo_circulado.png';

export function SignIn(){
  const { user } = useAuth();
  console.log(user.name);


  return (
    <>
      <Container>

        <Title>POLVVO</Title>
        <ImageContainer>
            <Image source={logo} resizeMode={'center'} />
        </ImageContainer>
        <Introduction>Faça seu login com sua conta Google</Introduction> 

        <ButtonContainer>
          <Button>
            <Image
              source={google}
              style={styles.buttonImageIconStyle}
            />
            <View style={styles.buttonIconSeparatorStyle} />
            <ButtonText>Entrar com conta Google</ButtonText>
          
          </Button>
        </ButtonContainer>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  buttonImageIconStyle: {
    padding: 10,
    margin: 10,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  buttonIconSeparatorStyle: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
});