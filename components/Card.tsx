/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode
};

const cardStyle = css({
  marginTop: 10,
  marginLeft: 5,
  marginRight: 5,
  padding: 16,
  backgroundColor: 'white',
  fontSize: 24,
  borderRadius: 20,
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  textTransform: 'capitalize',
  boxShadow: '2px 2px 5px grey',
  color: 'black'
});

const Card = ({ children }: Props) => {
  return (
    <div css={cardStyle}>
      {children}
    </div>
  )
};

export default Card;
