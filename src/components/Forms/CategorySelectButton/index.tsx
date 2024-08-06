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
}

export function CategorySelectButton({title, icon}: Props){
    return(
        <Container>
            <Category>{title}</Category>
            <Icon name={icon}/>
        </Container>
    );
}
