import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import Loader from '../components/Loader';
import HList from '../components/Hlist';
import { movieAPI, tvAPI } from '../StateManager';
const Container = styled.ScrollView`
  background-color: ${(props: any) => props.theme.mainBgColor};
`;
const SearchInput = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
`;
const Search = () => {
  const [query, setquery] = useState('');
  const {
    isLoading: MVisLoading,
    data: MVdata,
    refetch: MVrefetch,
  } = useQuery(['searchmovies', query], movieAPI.searchMovie, {
    enabled: false,
  });
  const {
    isLoading: TVisLoading,
    data: TVdata,
    refetch: TVrefetch,
  } = useQuery(['searchTV', query], tvAPI.searchTV, {
    enabled: false,
  });
  const onChangeText = (text: string) => setquery(text);
  const onSubmit = async () => {
    if (query == '') {
      return;
    } else {
      await MVrefetch();
      await TVrefetch();
    }
  };
  return (
    <Container>
      <SearchInput
        placeholder="Search Movieor TV show"
        placeholderTextColor="grey"
        returnKeyType="search"
        autoCapitalize="none"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {MVisLoading || TVisLoading ? <Loader /> : null}
      {MVdata ? <HList title={'Movie Results'} data={MVdata.results} /> : null}
      {TVdata ? (
        <HList title={'TV Show Results'} data={TVdata.results} />
      ) : null}
    </Container>
  );
};

export default Search;
