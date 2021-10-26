import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export interface DataListProps extends GoalCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
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

    async function loadTransactions(){
        const dataKey = '@polvvo:transactions';
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
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date,
            }

        });
        

        setTransactions(transactionsFormatted);

        const total = entriesTotal - expensiveTotal; 

        sethighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
            })
          }
        });
        
        setIsLoading(false);

    }
    
    useEffect(() => {
        loadTransactions();
    }, [])

    useFocusEffect(useCallback(() => {
        loadTransactions();
    },[]));

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
                            source={{ uri: 'https://media-exp1.licdn.com/dms/image/C560BAQETWSn5Oeg8ow/company-logo_200_200/0/1633962448032?e=1643241600&v=beta&t=ySKdiLO0y5LICQtNfFMTF5JU8QROeVFRZO2w1S9A0No'}} 
                        />
                        <User>
                            <UserGreeting>Olá, </UserGreeting>
                            <UserName>Diego</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={() => {}}>
                        <Icon name="power"/>
                    </LogoutButton>
                </UserWrapper>
            </Header>

            <HighLightCards>

                <HighLightcard 
                    type="up"
                    title="Entradas" 
                    amount={highlightData.entries.amount}
                    lastTransaction="Última entrada dia 13 de abril"
                />
                <HighLightcard
                    type="down" 
                    title={"Saídas"} 
                    amount={highlightData.expensives.amount} 
                    lastTransaction="Última saída dia 03 de abril"
                />
                <HighLightcard
                    type="total"
                    title="Total" 
                    amount={highlightData.total.amount} 
                    lastTransaction="01 à 16 de abril"
                />

            </HighLightCards>

            <Goals>
                <Title>Listagem de metas</Title>

                <GoalList 
                    data={transactions}
                    keyExtractor={ item => item.id}
                    renderItem={({ item }) => <GoalCard data={item} />} 
                />
            </Goals>
          </>
        }
      </Container>
    )
}
