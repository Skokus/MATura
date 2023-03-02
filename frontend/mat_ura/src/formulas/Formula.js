import React, { useEffect, useState } from 'react';

function Formula(props){    

  const [isOpen, setIsOpen] = useState(false);

    return(
      <div className="formula">
        <div className="formula-description">{props.formula.description}</div>
      </div>
    );
}
export default Formula;