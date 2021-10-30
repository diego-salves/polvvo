import React from "react";
import { RectButtonProps } from 'react-native-gesture-handler';
import { categories } from "../../utils/categories";

import { 
    Container ,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,
    IconClose,
    Header,
    Collumn,
    IconButton,
} from './styles'

export interface GoalCardProps {
    id: string;
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface Props extends RectButtonProps {
    data: GoalCardProps;
}

export function GoalCard({ data, ...rest } : Props){
    const[ category ] = categories.filter(
        item => item.key === data.category
    );

    return (
        <Container>
            <Header>
            <Collumn>
            <Title>
                {data.name}
            </Title>

            <Amount type={data.type}>
                { data.type==='negative' && '- '}
                { data.amount }
            </Amount>
            </Collumn>  
            
            <IconButton 
                {...rest}>
                <IconClose name={"close"}/>
            </IconButton>
            
            
            </Header>

            <Footer>
                <Category>
                    <Icon name={category.icon}/>
                    <CategoryName type={data.type}>
                        {category.name}
                    </CategoryName>
                </Category>

                <Date>
                    {data.date}
                </Date>
            </Footer>
            
        </Container>
    )
}