import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
    width: 100%;
    font-size: ${RFValue(30)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
    position: absolute;
    text-align: center;
    top: 50%;
    margin-bottom: 5px;
    color: ${({ theme }) => theme.colors.text_dark};
`;

export const Introduction = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    align-self: center;
    text-align: center;
    position: relative;
    width: 320px;
    height: 90px;
    top: 30%;
    color: ${({ theme }) => theme.colors.text_dark};
    margin-top: 5px;
`;

export const ImageContainer = styled.View`
    top: 18%;
    flex: 0.35;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    align-self: center;
    margin-bottom: 10px;
`;
