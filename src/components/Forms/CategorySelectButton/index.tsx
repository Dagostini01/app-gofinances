import React from "react";
import { IconName } from "./icon";
import { 
    Container,
    Category,
    Icon,
} from "./styles";

interface Props {
    title: string;
    icon: IconName;
    onPress: () => void;
}

export function CategorySelectButton({title, icon, onPress}: Props){
    return(
        <Container onPress={onPress}>
            <Category>{title}</Category>
            <Icon name={icon}/>
        </Container>
    );
}
