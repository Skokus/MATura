import React, { useEffect, useState } from 'react';

function Formula(props){    

  const [isOpen, setIsOpen] = useState(false);
  
  return(
    <div className="formula" onClick={() => setIsOpen(!isOpen)}>
      <div className="formula-description">{props.formula.description}</div>
      {isOpen && <div>lmao</div>}
    </div>
  );
}
export default Formula;