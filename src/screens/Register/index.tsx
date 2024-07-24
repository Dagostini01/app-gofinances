import React from 'react';
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
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
        </Fields>
        <TransactionTypeButton type='arrow-up-circle' title='Income'/>
        <Button title='Enviar' />
      </Form>

    </Container>
  )
}
