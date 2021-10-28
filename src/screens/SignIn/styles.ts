import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
    width: 100%;
    font-size: ${RFValue(32)}px;
    align-self: center;
    font-family: ${({ theme }) => theme.fonts.bold};
    position: absolute;
    width: 160px;
    height: 44px;
    top: 8%;
    color: ${({ theme }) => theme.colors.text_dark};
`;

export const Introduction = styled.Text`
    font-size: ${RFValue(22)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
    align-self: center;
    text-align: center;
    position: relative;
    width: 320px;
    height: 90px;
    top: 20%;
    color: ${({ theme }) => theme.colors.text_dark};
`;

export const ImageContainer = styled.View`
    top: 15%;
    flex: 0.25;
    width: 100%;
    height: 70%;
    justify-content: center;
    align-items: center;
    align-self: center;
`;

export const Button = styled(RectButton)`
    width: 75%;
    height: ${RFValue(48)}px;
    background-color: ${({ theme }) => theme.colors.primary.light};
    border-radius: 5px;
    align-items: center;
    flex-direction: row;
`;

export const ButtonText = styled.Text`
    color: #FFF;
    margin-bottom: 4px;
    margin-left: 15px;
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
`;
export const ButtonContainer = styled.View`
    align-items: center;
    width: 100%;
    top: 30%;
    `;

export const LoadingContainer = styled.View`
    width: 100%;
    top: 40%;
`;