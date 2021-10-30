import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from 'react-native-gesture-handler';
import { 
    parseISO, 
    format, 
  } from 'date-fns';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native'
import { HighLightcard } from "../../components/HighLightCard";
import { GoalCard, GoalCardProps } from "../../components/GoalCard";

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighLightCards,
    Goals,
    Title,
    GoalList,
    LogoutButton,
    LoadContainer
} from './styles'

import { useAuth } from "../../hooks/auth";

export interface DataListProps extends GoalCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
    lastTransaction: string;
}

interface HighlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}

export function Dashboard(){
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, sethighlightData] = useState<HighlightData>({} as HighlightData);
    const theme = useTheme();
    const { signOut, user } = useAuth();
    const dataKey = `@polvvo:transactions_user:${user.id}`;


    function getLastTransactionDate(
        collection: DataListProps[], 
        type: 'positive' | 'negative' 
    ){
        const collectionFilttered = collection
        .filter(transaction => transaction.type === type);

        if(collectionFilttered.length === 0)
        return 0;

        const lastTransaction = new Date(
        Math.max.apply(Math, collectionFilttered
        .map(transaction =>new Date(transaction.date).getTime())))

        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR',{ month: 'long'})}`;
    }

    async function loadTransactions(){
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions
        .map((item: DataListProps) => {

            if(item.type === 'positive'){
                entriesTotal += Number(item.amount);
            }else {
                expensiveTotal += Number(item.amount);
            }

            let amount = Number(item.amount)
            .toLocaleString('pt-Br', {
                style: 'currency',
                currency: 'BRL',
            });

            amount =amount.replace('R$', 'R$ ');

            const date = Intl.DateTimeFormat('pt-br',{
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date));

            return {
                id: String(item.id),
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date,
            }
        });

        setTransactions(transactionsFormatted);

        const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
        const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');
        const totalInterval = lastTransactionExpensives === 0 
        ? 'Não há transações' 
        : `01 a ${lastTransactionExpensives}`;

        const total = entriesTotal - expensiveTotal; 

        sethighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: lastTransactionEntries === 0 
                ? 'Nenhuma meta cadastrada' 
                : `Última meta cadastrada dia ${lastTransactionEntries}`,
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: lastTransactionExpensives === 0
                ? 'Não há saídas registradas'
                : `Última saída dia ${lastTransactionExpensives}`,
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
            }),
            lastTransaction: totalInterval
          }
        });
        
        setIsLoading(false);

    }

    async function handleRemoveSkill(transactionId: string) {
        const response = await AsyncStorage.getItem(dataKey);
        const storagedTransactions = response ? JSON.parse(response) : [];
       
        const filteredTransactions = storagedTransactions
        .filter((transaction: DataListProps) => transaction.id !== transactionId);
      
        setTransactions(filteredTransactions);
        await AsyncStorage.setItem(dataKey, JSON.stringify(filteredTransactions));
  
        loadTransactions()
        }
        function alerta(name: string, id: string,) {
          Alert.alert(`Você deseja deletar ${String(name)} ?`,
          "",
          [
            {text: 'Cancelar', },
            {text: 'Deletar', onPress: () => handleRemoveSkill(id) },
          ],
            {cancelable: false}
          )}
  
  
        function logOff() {
          {
            Alert.alert(`Desconectar?`,
            "",
            [
              {text: 'Cancelar', },
              {text: 'Desconectar', onPress: () =>  signOut()},
            ],
              {cancelable: false}
            )}
        }
  
    
    useEffect(() => {
        loadTransactions();
    }, [])

    useFocusEffect(useCallback(() => {loadTransactions()},[]));

    return(
      <Container>
        {
            isLoading ? 
            <LoadContainer>
               <ActivityIndicator 
                color={theme.colors.primary.dark}
                size="large" 
                />
            </LoadContainer> :
            <>
                <Header>
                    <UserWrapper>
                        <UserInfo>
                            <Photo 
                                source={{ uri: user.photo}} 
                            />
                            <User>
                                <UserGreeting>Olá, </UserGreeting>
                                <UserName>{user.name}</UserName>
                            </User>
                        </UserInfo>
                        <LogoutButton onPress={logOff}>
                            <Icon name="power"/>
                        </LogoutButton>
                    </UserWrapper>
                </Header>

                <HighLightCards>

                    <HighLightcard 
                        type="up"
                        title="Entradas" 
                        amount={highlightData.entries.amount}
                        lastTransaction={highlightData.entries.lastTransaction}
                    />
                    <HighLightcard
                        type="down" 
                        title={"Saídas"} 
                        amount={highlightData.expensives.amount} 
                        lastTransaction={highlightData.expensives.lastTransaction}
                    />
                    <HighLightcard
                        type="total"
                        title="Total" 
                        amount={highlightData.total.amount} 
                        lastTransaction={highlightData.total.lastTransaction}
                    />

                </HighLightCards>

                <Goals>
                    <Title>Listagem de metas</Title>

                    <GoalList 
                        data={transactions}
                        keyExtractor={ item => item.id}
                        renderItem={({ item }) => <GoalCard
                        onPress={ () => alerta(item.name, item.id)}
                        data={item} />}
                        showsVerticalScrollIndicator={false}
                    />
                </Goals>
            </>
            }
      </Container>
    )
}
