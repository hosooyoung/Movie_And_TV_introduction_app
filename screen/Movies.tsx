import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View,
  Text,
  useColorScheme,
  RefreshControl,
  FlatList,
  Alert,
} from 'react-native';

import {
  useQuery,
  QueryClient,
  useQueryClient,
  useInfiniteQuery,
} from 'react-query';
import { Movie, movieAPI, MovieResponse } from '../StateManager';
import { BlurView } from 'expo-blur';
// import { StyleSheet } from 'react-native';
// import { TouchableOpacity, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import Slide from '../components/Slide';
import styled from 'styled-components/native';
import HMedia from '../components/Hmedia';
import Vmedia from '../components/Vmedia';
import HList from '../components/Hlist';
const API_KEY = '125b27dc67370fdb108916a0a7e7f110';
// import { getImagePath } from '../utils';
const Container = styled.FlatList`
  background-color: ${(props: any) => props.theme.mainBgColor};
` as unknown as typeof FlatList;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props: any) => props.theme.mainBgColor};
`;
const ListTitle = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin-left: 15px;
  margin-bottom: 10px;
  margin-top: 15px;
`;
const ListContainer = styled.View`
  margin-bottom: 40px;
  flex: 1;
`;
const Date = styled.Text`
  color: white;
  font-size: 12px;
  margin-vertical: 10px;
`;
const renderHmedia = ({ item }: { item: Movie }) => (
  <HMedia
    key={item.id}
    posterPath={item.poster_path}
    originalTitle={item.original_title}
    overview={item.overview}
    releaseDate={item.release_date}
    fulldata={item}
  />
);
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const queryClient = new QueryClient();
  const useClient = useQueryClient();
  let isdark = useColorScheme() === 'dark';
  const {
    isLoading: NowPlayingLoading,
    data: NowPlayingdata,
    isRefetching: isRefetchingNow,
  } = useQuery<MovieResponse>(
    ['movies', 'NowPlayingMovie'],
    movieAPI.getNowPlaying
  );
  const {
    isLoading: CommingLoading,
    data: Commingdata,
    isRefetching: isRefetchingComming,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<MovieResponse>(
    ['movies', 'CommingMovie'],
    movieAPI.getComming,
    {
      getNextPageParam: (currentPage) => {
        if (currentPage.page + 1 > currentPage.total_pages) {
          return null;
        }
        return currentPage.page + 1;
      },
    }
  );
  const {
    isLoading: TrendLoading,
    data: Trenddata,
    isRefetching: isRefetchingTrend,
  } = useQuery<MovieResponse>(
    ['movies', 'TrendingMovie'],
    movieAPI.getTrending
  );
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
    Alert.alert('load more!');
  };
  const loading = NowPlayingLoading || CommingLoading || TrendLoading;
  const refreshing =
    isRefetchingNow || isRefetchingComming || isRefetchingTrend;
  /*
  const [MovieList, setMovieList] = useState<any[]>([]);
  const [ComingList, setComingList] = useState<any[]>([]);
  const [TrendList, setTrendList] = useState<any[]>([]);
  const getNowPlaying = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    );
    setMovieList(res.data.results);
  };
  const getComming = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    );
    setComingList(res.data.results);
  };
  const getTrend = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );
    setTrendList(res.data.results);
  };
  const getAllMovieData = async () => {
    await Promise.all([getNowPlaying(), getComming(), getTrend()]);
    setMovieLoading(false);
  };*/
  useEffect(() => {
    //getAllMovieData();
  }, []);
  const onReFresh = async () => {
    queryClient.refetchQueries(['movies']);
  };
  return loading ? (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader>
  ) : Commingdata ? (
    <Container
      onEndReached={loadMore}
      onEndReachedThreshold={0.4}
      onRefresh={onReFresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <ListContainer>
            <ListTitle>OnScreen Movies</ListTitle>
            <Swiper
              containerStyle={{
                width: '100%',
                height: SCREEN_HEIGHT / 4,
              }}
              loop
              autoplay
              autoplayTimeout={3}
              showsButtons={false}
              showsPagination={false}
            >
              {NowPlayingdata?.results.map((movie: Movie) => {
                return (
                  <Slide
                    key={movie.id}
                    backdropPath={movie.backdrop_path || ''}
                    posterPath={movie.poster_path || ''}
                    originalTitle={movie.original_title}
                    voteAverage={movie.vote_average}
                    overview={movie.overview}
                    fulldata={movie}
                  ></Slide>
                );
              })}
            </Swiper>
          </ListContainer>
          {Trenddata ? (
            <HList title="Trend Movies" data={Trenddata.results} />
          ) : null}
          <ListTitle>Coming Soon!!!!!</ListTitle>
        </>
      }
      data={Commingdata.pages.map((page) => page.results).flat()}
      keyExtractor={(item) => item.id + ''}
      renderItem={renderHmedia}
    ></Container>
  ) : null;
};

export default Movies;
