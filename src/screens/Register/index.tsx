import React, { useState } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';
import { InputForm } from '../../components/Forms/InputForm';

interface FormData {
  name: string;
  amount: number;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number().typeError("Informe um valor numérico").positive('O valor nao pode ser nagativo').required("O valor é obrigatório")
});


export function Register() {
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('');

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
    icon: 'icon-placeholder',
  });

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  function handleTransactionsTypeSelect(type: 'arrow-up-circle' | 'arrow-down-circle') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleClosedSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  const handleRegister: SubmitHandler<FormData> = (form) => {
    if (!transactionType)
      return Alert.alert('Selecione o tipo da transação')
    if (category.key === 'category')
      return Alert.alert('Selecione a categoria')

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };
    console.log(data);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm name='name' control={control} placeholder='Nome' autoCapitalize="sentences" autoCorrect={false} error={errors.name?.message??''} />

            <InputForm name='amount' control={control} placeholder='Preço' keyboardType="numeric" error={errors.amount?.message??''} />

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
      </Container >
    </TouchableWithoutFeedback>
  );
}
