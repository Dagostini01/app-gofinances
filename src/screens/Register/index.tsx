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
import { CategorySelect } from '../CategorySelect';

export function Register() {

  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [transactionType, setTransactionType] = useState('');

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
    icon: 'icon-placeholder'
  })

  function handleTransactionsTypeSelect(type: 'arrow-up-circle' | 'arrow-down-circle') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }
  function handleClosedSelectCategoryModal() {
    setCategoryModalOpen(false)
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

          <CategorySelectButton title={category.name} icon='chevron-down' onPress={handleOpenSelectCategoryModal} />

        </Fields>
        <Button title='Enviar' />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect category={category} setCategory={setCategory} closeSelectCategory={handleClosedSelectCategoryModal} />
      </Modal>

    </Container>
  )
}
