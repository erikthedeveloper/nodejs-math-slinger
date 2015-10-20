'use strict';
import React from 'react';

export default function CalcDisplay(props) {
  const { displayValue } = props;
  return (
    <input
      type="text"
      className="form-control input-lg"
      style={{marginBottom: 10}}
      disabled
      value={displayValue}
      placeholder="Example: 2+3*4"
    />
  )
}
