import React from "react";
import { TouchableOpacityProps } from "react-native";
import { IconName } from "./icon"

import { 
    Container,
    Icon,
    Title,
} from "./styles";

interface Props extends TouchableOpacityProps {
    type: IconName;
    title: string;
    isActive: boolean;
}

export function TransactionTypeButton({title, type, isActive, ...rest}: Props){
    return(
        <Container {...rest} isActive={isActive} type={type}>
            <Icon name={type} type={type}/>
            <Title>
                {title}
            </Title>
        </Container>
    );
}