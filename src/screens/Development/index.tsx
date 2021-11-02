import React from "react";
import { 
    Image,
  } from 'react-native';

import {
    Container,
    Title,
    Introduction,
    ImageContainer,
} from './styles'

import logo from '../../assets/icon_Polvvo_circulado.png';

export function Development(){
  return (
    <>
      <Container>
        <Title>Área em desenvolvimento</Title>
        <ImageContainer>
          
            <Image source={logo}  resizeMode={'center'}/>
        </ImageContainer>
        <Introduction>Caso queira saber mais, nos chame em nossas redes sociais</Introduction> 

      </Container>
    </>
)};

 