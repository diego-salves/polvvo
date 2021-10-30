import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
    
`;

export const Title = styled.Text`
    font-size: ${RFValue(22)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.text_dark};
`;
