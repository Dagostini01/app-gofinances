import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

type IconProps = {
  type: "arrow-up-circle" | "arrow-down-circle";
};

type ContainerProps = {
  isActive: boolean;
  type: "arrow-up-circle" | "arrow-down-circle";
};

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;
  padding: 16px;
  ${({ isActive, type }) =>
    isActive &&
    type == "arrow-up-circle" &&
    css`
      background-color: ${({ theme }) => theme.colors.succes_light};
    `}
  ${({ isActive, type }) =>
    isActive &&
    type == "arrow-down-circle" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `}
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, type }) =>
    type === "arrow-up-circle" ? theme.colors.succes : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
