import React from "react";

import { Input } from "../../components/Form/Input";

import { 
    Container,
    Header,
    Title,
 } from './styles';

export function Register(){
    return(
        <Container>
            <Header>
                <Title>
                    Cadastro da meta
                </Title>

            </Header>

            <Input 
                placeholder="Meta"
            />

        </Container>
    );
}