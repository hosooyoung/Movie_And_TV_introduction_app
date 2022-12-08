import React from 'react';
import styled from 'styled-components/native';
import Vmedia from './Vmedia';
import { View, Text, FlatList } from 'react-native';
import { Movie } from '../StateManager';
const ListContainer = styled.View`
  margin-bottom: 30px;
  flex: 1;
`;
const ListTitle = styled.Text`
  margin-bottom: 10px;
  margin-left: 30px;
  font-size: 18px;
  font-weight: 600;
  color: white;
`;
interface HListProps {
  title: string;
  data: any[];
}

const HList: React.FC<HListProps> = ({ title, data }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      data={data}
      horizontal
      contentContainerStyle={{ paddingHorizontal: 30 }}
      keyExtractor={(item) => item.id + ''}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }: { item: Movie }) => (
        <Vmedia
          id={item.id}
          original_title={item.original_name ?? item.original_title}
          vote_average={item.vote_average}
          posterPath={item.poster_path}
          fulldata={item}
        />
      )}
    />
  </ListContainer>
);

export default HList;
