import React, { useState } from "react";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes,
 } from './styles';

export function Register(){
    const [transactionType, setTransactionType] = useState(' ');

    function handleTransactionTypeSelect(type: 'up' | 'down'){
        setTransactionType(type);
    }

    return(
        <Container>
            <Header>
                <Title>
                    Cadastro da meta
                </Title>

            </Header>

            <Form>
                <Fields>
                    <Input 
                        placeholder="Meta"
                    />
                    <Input 
                        placeholder="Recompensa"
                    />

                    <TransactionsTypes>
                        <TransactionTypeButton 
                            type="up"
                            title="Income"
                            onPress={() => handleTransactionTypeSelect('up')}
                            isActive={transactionType === 'up'}
                        />
                        <TransactionTypeButton 
                            type="down"
                            title="Outcome"
                            onPress={() => handleTransactionTypeSelect('down')}
                            isActive={transactionType === 'down'}
                        />
                    </TransactionsTypes>
                </Fields>

                <Button title="Adicionar meta" />
            </Form>

        </Container>
    );
}