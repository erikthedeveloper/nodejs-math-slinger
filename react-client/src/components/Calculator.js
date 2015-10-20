'use strict';
import React from 'react';
import CalcDisplay from './CalcDisplay';
import CalcButton from './CalcButton';

import { CALC_WIDTH, BTN_HEIGHT } from './../constants';

const buttonRows = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0, '.']];
const operators = ['+', '-', '*', '/'];

const Calculator = React.createClass({

  getInitialState() {
    return {
      expression: ''
    }
  },

  _setExpression(expression) {
    this.setState({expression});
  },

  _addToExpression(text) {
    const { expression } = this.state;
    this._setExpression(expression + text);
  },

  _backspace() {
    const { expression } = this.state;
    this._setExpression(expression.substr(0, expression.length - 1));
  },

  _evaluateExpression() {
    const { expression } = this.state;
    this._setExpression(eval(expression));
  },

  render() {
    const { expression } = this.state;

    return (
      <div>
        <div className="well" style={{width: CALC_WIDTH, margin: 'auto'}}>
          <CalcDisplay displayValue={expression} />

          <div className="row">
            <div className="col-xs-9">
              {buttonRows.map((row, rowI) =>
                <div key={rowI}>
                  {row.map(val =>
                    <CalcButton key={val} text={val} onClick={this._addToExpression.bind(this, val)} />
                  )}
                </div>
              )}
              <CalcButton text="DEL" onClick={this._backspace} />
              <CalcButton text="AC" onClick={this._setExpression.bind(null, '')} wide />
            </div>

            <div className="col-xs-3">
              {operators.map(val =>
                <CalcButton key={val} text={val} onClick={this._addToExpression.bind(this, val)} style={{display: 'block'}} />
              )}
              <CalcButton text="=" style={{display: 'block', clear: 'both'}} onClick={this._evaluateExpression} />
            </div>
          </div>

        </div>
      </div>
    );
  }
});

export default Calculator;
