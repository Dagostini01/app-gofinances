import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';

import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';
import { InputForm } from '../../components/Forms/InputForm';

interface FormData {
  name: string;
  amount: string;
}

export function Register() {
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('');

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
    icon: 'icon-placeholder',
  });

  // Especifica o tipo FormData para o useForm
  const { control, handleSubmit } = useForm<FormData>();

  function handleTransactionsTypeSelect(type: 'arrow-up-circle' | 'arrow-down-circle') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleClosedSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  // Define o tipo de parâmetro da função como FormData
  const handleRegister: SubmitHandler<FormData> = (form) => {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };
    console.log(data);
  };

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm name='name' control={control} placeholder='Nome' />
          <InputForm name='amount' control={control} placeholder='Preço' />

          <TransactionTypes>
            <TransactionTypeButton
              onPress={() => handleTransactionsTypeSelect('arrow-up-circle')}
              type='arrow-up-circle'
              title='Income'
              isActive={transactionType === 'arrow-up-circle'}
            />
            <TransactionTypeButton
              onPress={() => handleTransactionsTypeSelect('arrow-down-circle')}
              type='arrow-down-circle'
              title='Outcome'
              isActive={transactionType === 'arrow-down-circle'}
            />
          </TransactionTypes>

          <CategorySelectButton
            title={category.name}
            icon='chevron-down'
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>
        <Button title='Enviar' onPress={handleSubmit(handleRegister)} />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleClosedSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}
