// src/CoverFlow.js
import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

// Styled components for CoverFlow
const CoverFlowWrapper = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
`;

const CoverFlowItem = styled(animated.div)`
  flex: 0 0 auto;
  width: 150px; /* Adjust size as needed */
  height: 150px; /* Adjust size as needed */
  margin: 0 10px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
`;

const CoverFlow = ({ items }) => {
  const springs = items.map((_, index) =>
    useSpring({
      opacity: index === 0 ? 1 : 0.5, // Highlight the current item
      transform: `translateX(${(index - 0) * 160}px)`, // Adjust based on item size
      config: { tension: 300, friction: 20 }
    })
  );

  return (
    <CoverFlowWrapper>
      {items.map((item, index) => (
        <CoverFlowItem
          key={index}
          style={{
            ...springs[index],
            backgroundImage: `url(${item.image})`, // Set background image
          }}
        />
      ))}
    </CoverFlowWrapper>
  );
};

export default CoverFlow;
