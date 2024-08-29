import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList, // Certifique-se de que TransactionList seja um alias para FlatList
} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  
  const [data, setData] = useState<DataListProps[]>([]);

  async function loadTransaction(){
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date))

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date
      }
    })

    setData(transactionsFormatted)
    console.log(transactionsFormatted)

  }

  useEffect(()=>{
    loadTransaction();
    // const dataKey = '@gofinances:transactions';
    // AsyncStorage.removeItem(dataKey);
  },[])

  useFocusEffect(useCallback(()=>{
    loadTransaction();
  },[]));

return (
  <Container>
    <Header>
      <UserWrapper>
        <UserInfo>
          <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/87324617?v=4' }} />
          <User>
            <UserGreeting>Olá, </UserGreeting>
            <UserName>Pedro</UserName>
          </User>
        </UserInfo>
        <Icon name='power' />
      </UserWrapper>
    </Header>

    <HighlightCards>
      <HighlightCard />
      <HighlightCard />
      <HighlightCard />
    </HighlightCards>

    <Transactions>
      <Title>Listagem</Title>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <TransactionCard data={item} />}
      />
    </Transactions>
  </Container>
);
}
