import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, useColorScheme, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { getImagePath } from '../utils';
import { BlurView } from 'expo-blur';
import Poster from './Poster';
import Votes from './Vote';
import { Movie } from '../StateManager';
const Title = styled.Text`
  color: white;
`;
const View = styled.View`
  flex: 1;
`;
const ClickArea = styled.TouchableWithoutFeedback`
  flex: 1;
`;
const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Col = styled.View`
  width: 50%;
`;
const Overview = styled.Text`
  color: rgba(225, 225, 225, 0.6);
`;
const BgImg = styled.Image``;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  overview: string;
  voteAverage: Number;
  fulldata: Movie;
}
const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  overview,
  voteAverage,
  fulldata,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate('Stack', {
      screen: 'Detail',
      params: {
        ...fulldata,
      },
    });
  };
  let isdark = useColorScheme() === 'dark';
  return (
    <ClickArea onPress={goToDetail}>
      <View>
        <BgImg
          style={StyleSheet.absoluteFill}
          source={{ uri: getImagePath(backdropPath) }}
        />
        <BlurView intensity={85} style={StyleSheet.absoluteFill} tint={'dark'}>
          <Wrapper>
            <Poster posterPath={posterPath} />
            <Col>
              <Title>{originalTitle}</Title>
              <Overview>{overview.slice(0, 100) + '...'}</Overview>
              <Votes vote_average={voteAverage}></Votes>
            </Col>
          </Wrapper>
        </BlurView>
      </View>
    </ClickArea>
  );
};

export default Slide;
