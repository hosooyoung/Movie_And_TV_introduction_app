import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Movie, movieAPI, tvAPI } from '../StateManager';
import Poster from '../components/Poster';
import { Dimensions, StyleSheet, Linking, Share, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getImagePath } from '../utils';
import { BLACK } from '../color';
import { useQuery, QueryClient, useQueryClient } from 'react-query';
import { isLoading } from 'expo-font';
import Loader from '../components/Loader';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
const Container = styled.ScrollView`
  background-color: ${(props: any) => props.theme.mainBgColor};
`;
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;
const Column = styled.View`
  flex-direction: row;
`;
const Title = styled.Text`
  color: white;
  font-size: 30px;
  align-self: flex-end;
  margin-left: 10px;
  font-weight: 500;
  flex: 2;
`;
const Overview = styled.Text`
  color: white;
  margin-top: 20px;
  padding: 0px 20px;
`;
const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;
const ShaereBtn = styled.TouchableOpacity``;
const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;
const Data = styled.View`
  padding: 0px 20px;
`;
const Background = styled.Image``;

type DetailStackParam = {
  Detail: Movie;
};
type DetailStackProps = NativeStackScreenProps<DetailStackParam, 'Detail'>;
const Detail: React.FC<DetailStackProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const Sharebtn = () => (
    <ShaereBtn onPress={shareMedia}>
      <Ionicons size={24} name="share" color="white" />
    </ShaereBtn>
  );
  const shareMedia = async () => {
    const isAndroid = Platform.OS === 'android';
    if (isAndroid) {
      await Share.share({
        url: isMovie
          ? `https://www.imdb.com/title/${Searchdata.imdb_id}/`
          : Searchdata.homepage,
        message: `{params.overview}\n check it out :${Searchdata.homepage}`,
        title: isMovie ? params.original_title : params.original_name,
      });
    }
  };
  const isMovie = 'original_title' in params;
  const { isLoading: Loading, data: Searchdata } = useQuery(
    [isMovie ? 'movies' : 'tv', params.id],
    isMovie ? movieAPI.detail : tvAPI.detail
  );
  const openYTLink = async (link: string) => {
    const baseURL = `http://m.youtube.com/watch?v=${link}`;
    await WebBrowser.openBrowserAsync(baseURL);
  };
  useEffect(() => {
    setOptions({
      title: 'original_title' in params ? 'Movie' : 'TV show',
    });
  }, []);
  useEffect(() => {
    if (Searchdata) {
      setOptions({
        headerRight: () => Sharebtn(),
      });
    }
  }, [Searchdata]);
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: getImagePath(params.backdrop_path || '') }}
        />
        <LinearGradient
          // Background Linear Gradient
          colors={['transparent', BLACK]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster posterPath={params.poster_path || ''} />
          <Title>
            {'original_title' in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>

      <Data>
        <Overview>{params.overview}</Overview>
        {Loading ? <Loader /> : null}
        {Searchdata?.videos?.results?.map((video) =>
          video.site === 'YouTube' ? (
            <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
              <Ionicons name="logo-youtube" color="white" size={24} />
              <BtnText>{video.name}</BtnText>
            </VideoBtn>
          ) : null
        )}
      </Data>
    </Container>
  );
};

export default Detail;
