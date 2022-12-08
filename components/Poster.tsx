import React from 'react';
import styled from 'styled-components/native';
import { getImagePath } from '../utils';

const View = styled.View`
  flex: 1;
`;
const Image = styled.Image`
  width: 100px;
  height: 150px;
  margin-right: 15px;
  border-radius: 5px;
`;

interface PosterProps {
  posterPath: string;
}
const Poster: React.FC<PosterProps> = ({ posterPath }) => {
  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: getImagePath(posterPath) }} />
    </View>
  );
};

export default Poster;
