import styled from "styled-components/native";
import { Feather, AntDesign } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

interface GoalProps {
    type: 'positive' | 'negative'; 
}


export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: 16px;

    padding: 14px 24px;
    margin-bottom: 16px;
    
    /* may broke the app: */

    elevation: 4;
`;

export const Title = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Amount = styled.Text<GoalProps>`
    font-size: ${RFValue(18)}px;
    margin-top: 2px;
    font-family: ${({ theme }) => theme.fonts.regular};
    
    color: ${({ theme, type }) => 
    type === 'positive' ? theme.colors.success.main : theme.colors.success.main};
    padding-bottom: 15px;
`;

export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 19px;
`;

export const Category = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Icon = styled( Feather )`
    font-size: ${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.text};
`;

export const CategoryName = styled.Text`
    font-size: ${RFValue(15)}px;
    color: ${({ theme }) => theme.colors.text};
    margin-left: 17px;
`;

export const Date = styled.Text`
    font-size: ${RFValue(15)}px;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.regular};
`;

export const IconButton = styled(RectButton)`
width: 20px;
height: 20px;
align-items: center;
justify-content: center;
`;

export const Header = styled.View`
width: 100%;
justify-content: space-between;
flex-direction: row;
`;

export const Collumn = styled.View``;

export const IconClose = styled(AntDesign)`
font-size: ${RFValue(15)}px;
color: ${({ theme }) => theme.colors.text};
`;