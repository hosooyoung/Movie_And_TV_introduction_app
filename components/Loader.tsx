import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props: any) => props.theme.mainBgColor};
`;
const Load = styled.View``;
const Loader: React.FC<{}> = () => {
  return (
    <Wrapper>
      <Load>
        <ActivityIndicator size="large" />
      </Load>
    </Wrapper>
  );
};

export default Loader;
