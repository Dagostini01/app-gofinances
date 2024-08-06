import React, { useState } from 'react';
import { Modal } from 'react-native';
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
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';

export function Register() {

  const [transactionType, setTransactionType] = useState('');
  function handleTransactionsTypeSelect(type: 'arrow-up-circle' | 'arrow-down-circle') {
    setTransactionType(type);
  }

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
            <TransactionTypeButton
              onPress={() => handleTransactionsTypeSelect('arrow-up-circle')}
              type='arrow-up-circle'
              title='Income'
              isActive={transactionType == 'arrow-up-circle'}
            />
            <TransactionTypeButton
              onPress={() => handleTransactionsTypeSelect('arrow-down-circle')} type='arrow-down-circle'
              title='Outcome'
              isActive={transactionType == 'arrow-down-circle'}
            />
          </TransactionTypes>

          <CategorySelectButton title='Categoria' icon='chevron-down'/>

        </Fields>
        <Button title='Enviar' />
      </Form>
    </Container>
  )
}
