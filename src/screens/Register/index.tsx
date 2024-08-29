import React, { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

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
  const dataKey = '@gofinances:transactions';

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
    icon: 'icon-placeholder',
  });

  const { control, reset, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  function handleTransactionsTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleClosedSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType)
      return Alert.alert('Selecione o tipo da transação')
    if (category.key === 'category')
      return Alert.alert('Selecione a categoria')

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    };

    try {
      const data = await AsyncStorage.getItem(dataKey); //pegando tudo dentro do async storage
      const currentData = data ? JSON.parse(data) : []; //transformando tudo em json, se nao retorna lista vazia

      const dataFormatted = [
        ...currentData,
        newTransaction
      ]; //pegando tudo e salvando o novo

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted)) //salvando tudo no async storage

      setTransactionType(''); //setendo os estados em null
      reset()
      setCategory({
        key: 'category',
        name: 'Categoria',
        icon: 'icon-placeholder',
      }); // null ate aqui

      Alert.alert("Cadastrado com sucesso!")

    } catch (error) {
      console.log(error)
      Alert.alert("Não foi possível salvar")
    }
  };

  useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem(dataKey)
      // console.log('bateu no asyncStorage', JSON.parse(data!)) AQUI MOSTRA TUDO QUEW TEM NO ASYNC STORAGE
    }
    loadData()
    // async function deleteAll() {
    //   AsyncStorage.removeItem(dataKey);
    // }
    // deleteAll()
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm name='name' control={control} placeholder='Nome' autoCapitalize="sentences" autoCorrect={false} error={errors.name?.message ?? ''} />

            <InputForm name='amount' control={control} placeholder='Preço' keyboardType="numeric" error={errors.amount?.message ?? ''} />

            <TransactionTypes>
              <TransactionTypeButton
                onPress={() => handleTransactionsTypeSelect('positive')}
                type='arrow-up-circle'
                title='Income'
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton
                onPress={() => handleTransactionsTypeSelect('negative')}
                type='arrow-down-circle'
                title='Outcome'
                isActive={transactionType === 'negative'}
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
