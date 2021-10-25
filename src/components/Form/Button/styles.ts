import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";


export const Container = styled(TouchableOpacity)`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary.light};

    padding: 15px;
    border-radius: 50px;
    align-items: center;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.text_dark};
`;