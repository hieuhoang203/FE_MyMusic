import React from 'react';
import { Spin, Skeleton } from 'antd';

const Loading = ({ 
  size = 'default', 
  tip = 'Loading...', 
  type = 'spinner',
  rows = 3,
  active = true 
}) => {
  if (type === 'skeleton') {
    return (
      <div style={{ padding: '20px' }}>
        <Skeleton 
          active={active} 
          paragraph={{ rows }} 
          title={{ width: '60%' }}
        />
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '200px' 
    }}>
      <Spin size={size} tip={tip} />
    </div>
  );
};

export default Loading;
