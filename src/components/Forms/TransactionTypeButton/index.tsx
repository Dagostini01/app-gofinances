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
}

export function TransactionTypeButton({title, type, ...rest}: Props){
    return(
        <Container {...rest}>
            <Icon name={type}/>
            <Title>
                {title}
            </Title>
        </Container>
    );
}