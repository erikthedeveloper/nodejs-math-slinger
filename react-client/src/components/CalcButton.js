'use strict';
import React from 'react';

import { CALC_WIDTH, BTN_HEIGHT } from './../constants';

export default function CalcButton(props) {
  const { text, wide, style, ...others } = props;

  const _style = Object.assign({}, style || {}, {
    height: BTN_HEIGHT,
    width: wide
      ? BTN_HEIGHT * 2
      : BTN_HEIGHT,
    borderRadius: 0
  });

  return (
    <button style={_style} className="btn btn-lg btn-default" {...others} >
      {text}
    </button>
  )
}
