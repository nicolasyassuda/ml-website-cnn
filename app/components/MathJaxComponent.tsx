import React from 'react';
import { MathComponent } from 'mathjax-react';

const MathJaxComponent = ({ formula }: { formula: string }) => {
  return (
    <div>
      <MathComponent tex={formula} />
    </div>
  );
};

export default MathJaxComponent;
