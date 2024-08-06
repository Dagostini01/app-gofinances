import React from "react";
import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer,
} from "./styles";
import { FlatList } from "react-native";
import { categories } from "../../utils/categories";
import { Button } from "../../components/Forms/Button";

type FeatherIconName = "shopping-bag" | "dollar-sign" | "crosshair" | "heart" | "book";

interface Category {
    key: string;
    name: string;
    icon: string;
}

interface Props {
    category: Category;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;
}

export function CategorySelect({
    category,
    setCategory,
    closeSelectCategory,
}: Props) {

    function handleCategorySelect(category: Category) {
        setCategory(category)
    }

    return (
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>
            <FlatList
                data={categories}
                style={{ flex: 1, width: "100%" }}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <Category
                        onPress={() => handleCategorySelect(item)}
                        isActive={category.key === item.key}
                    >
                        <Icon name={item.icon as FeatherIconName} size={25} color="black" />
                        <Name>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => <Separator />}
            />
            <Footer>
                <Button title="Selecionar" onPress={closeSelectCategory} />
            </Footer>
        </Container>
    );
}
