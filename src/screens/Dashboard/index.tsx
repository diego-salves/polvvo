import React from "react";

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
    LogoutButton
} from './styles'

export interface DataListProps extends GoalCardProps {
    id: string;
}

export function Dashboard(){
    const data: DataListProps[] = [
      {
        id: '1',
        type: 'positive',
        title: "Matemática",
        amount: "R$50,00",
        category: {
            name: 'Escola',
            icon: 'edit'
        },
        date: "23/10/2021",
      },
      {
        id: '2',
        type: 'negative',
        title: "História",
        amount: "R$30,00",
        category: {
            name: 'Escola',
            icon: 'edit'
        },
        date: "23/10/2021",
      },
      {
        id: '3',
        type: 'negative',
        title: "Tarefas Domésticas",
        amount: "R$20,00",
        category: {
            name: 'Casa',
            icon: 'home'
        },
        date: "23/10/2021",
      },
    ];

    return(
      <Container>
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
                amount="R$ 100,00" 
                lastTransaction="Última entrada dia 13 de abril"
            />
            <HighLightcard
                type="down" 
                title="Saídas" 
                amount="R$ 50,00" 
                lastTransaction="Última saída dia 03 de abril"
            />
            <HighLightcard
                type="total"
                title="Total" 
                amount="R$ 1000,00" 
                lastTransaction="01 à 16 de abril"
            />

        </HighLightCards>

        <Goals>
            <Title>Listagem de metas</Title>

            <GoalList 
                data={data}
                keyExtractor={ item => item.id}
                renderItem={({ item }) => <GoalCard data={item} />} 
            />

        </Goals>
      </Container>
    )
}
