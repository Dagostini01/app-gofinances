import React from "react";
import { Container } from "./styles";
import { Input } from "../Input";
import { TextInputProps } from "react-native";
import { Control, Controller } from "react-hook-form";

// Defina o FormData se ainda não estiver importado
interface FormData {
  name: string;
  amount: string;
}

interface Props extends TextInputProps {
  control: Control<FormData>;
  name: keyof FormData;
}

export function InputForm({
  control,
  name,
  ...rest
}: Props) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
        name={name}
      />
    </Container>
  );
}
