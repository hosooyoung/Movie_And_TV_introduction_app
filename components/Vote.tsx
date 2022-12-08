import React from 'react';
import styled from 'styled-components/native'

const Votes = styled.Text`
  margin-top: 5px;
  font-size: 18px;
  color: white;
`;

interface VoteProps {
    vote_average:Number;
    children?: never[]; 
  }
const Vote: React.FC<VoteProps> = ({vote_average}) => {
  return (
      <Votes>
        🌟
        {vote_average > 0
          ? Number(vote_average).toFixed(2)
          : 'coming soon'}
      </Votes>
  );
};

export default Vote;
