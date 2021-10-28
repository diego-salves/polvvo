import React, { useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
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
    ButtonText,
    LoadingContainer,
} from './styles'

import { useTheme } from 'styled-components';

import { useAuth } from '../../hooks/auth';

import google from '../../assets/google.png';
import logo from '../../assets/icon_Polvvo_circulado.png';

export function SignIn(){
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useAuth();
  const theme = useTheme();

  async function handleSignInWithGoogle(){
    try {
      setIsLoading(true);
       return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google');
      setIsLoading(false);
    }
  }

  return (
    <>
      <Container>

        <Title>POLVVO</Title>
        <ImageContainer>
            <Image source={logo} resizeMode={'center'} />
        </ImageContainer>
        <Introduction>Faça seu login com sua conta Google</Introduction> 

        <ButtonContainer>
          <Button onPress={handleSignInWithGoogle}>
            <Image
              source={google}
              style={styles.buttonImageIconStyle}
            />
            <View style={styles.buttonIconSeparatorStyle} />
            <ButtonText>Entrar com conta Google</ButtonText>
          </Button>
        </ButtonContainer>

        { isLoading && 
          <LoadingContainer>
            <ActivityIndicator 
              color={theme.colors.primary.main} 
              size='large' 
              />
          </LoadingContainer>
      }
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