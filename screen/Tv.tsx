import React,{useState} from 'react';
import { RefreshControl } from 'react-native';
import { tvAPI } from '../StateManager';
import styled from 'styled-components/native';
import { useQuery, QueryClient, useQueryClient } from 'react-query';
import Loader from '../components/Loader';
import Vmedia from '../components/Vmedia';
import HList from '../components/Hlist';
const queryClient = new QueryClient();
const Container = styled.ScrollView`
  background-color: ${(props: any) => props.theme.mainBgColor};
`;
const Tv = () => {
  const {
    isLoading: TodayLoading,
    data: TodayData,
    isRefetching: isRefetchingToday,
  } = useQuery(['tv', 'today'], tvAPI.getNowPlaying);
  const {
    isLoading: TrendLoading,
    data: TrendData,
    isRefetching: isRefetchingTrend,
  } = useQuery(['tv', 'trend'], tvAPI.getTrending);
  const {
    isLoading: RateLoading,
    data: RateData,
    isRefetching: isRefetchingRate,
  } = useQuery(['tv', 'rate'], tvAPI.getRated);
  const [refreshing, setRefreshing] = useState(false);
  const onReFresh = async () => {
    setRefreshing(true)
    await queryClient.refetchQueries(['tv']);
    setRefreshing(false)
  };
  const loading = TodayLoading || TrendLoading || RateLoading;
  // const refreshing = isRefetchingRate || isRefetchingToday || isRefetchingTrend;
  if (loading) {
    return <Loader />;
  }
  return (
    <Container
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onReFresh}
        ></RefreshControl>
      }
      contentContainerStyle={{ paddingVertical: 20 }}
    >
      <HList title="Today TV" data={TodayData.results} />
      <HList title="Trend TV show" data={TrendData.results} />
      <HList title="Top Rated TV show" data={RateData.results} />
    </Container>
  );
};

export default Tv;
