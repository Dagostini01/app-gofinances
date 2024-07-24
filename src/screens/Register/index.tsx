import React from 'react';
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';
import { Input } from '../../components/Forms/Input';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';

export function Register() {
  return (
    <Container>

      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder='Nome' />
          <Input placeholder='Preço' />
          <TransactionTypes>
            <TransactionTypeButton type='arrow-up-circle' title='Income' />
            <TransactionTypeButton type='arrow-down-circle' title='Outcome' />
          </TransactionTypes>
        </Fields>
        <Button title='Enviar' />
      </Form>

    </Container>
  )
}
