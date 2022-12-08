import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Poster from '../components/Poster';
import Vote from '../components/Vote';
import { Movie } from '../StateManager';
interface VmediaProps {
  posterPath: string;
  id: number;
  original_title: string;
  vote_average: number;
  fulldata: Movie;
  children?: never[];
}
const MovieItem = styled.View`
  flex: 1;
  margin-right: 20px;
  align-items: center;
`;
const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const Vmedia: React.FC<VmediaProps> = ({
  posterPath,
  id,
  original_title,
  vote_average,
  fulldata,
}) => {
  const navigation = useNavigation();
  const originalTitle = original_title;
  const goToDetail = () => {
    navigation.navigate('Stack', {
      screen: 'Detail',
      params: {
        ...fulldata,
      },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <MovieItem key={id}>
        <Poster posterPath={posterPath}></Poster>
        <Title>
          {original_title.length > 13
            ? original_title.slice(0, 13) + '...'
            : original_title}
        </Title>
        <Vote vote_average={vote_average}></Vote>
      </MovieItem>
    </TouchableOpacity>
  );
};

export default Vmedia;
