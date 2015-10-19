'use strict';
import React from 'react';
import {
  Row,
  Col,
  Button,
  Input,
  Well
} from 'react-bootstrap';

// TODO: Not this (for sizing).
const CALC_WIDTH = 500;
const BTN_HEIGHT = (CALC_WIDTH - 125) / 4;

const Calculator = React.createClass({

  getInitialState() {
    return {
      expression: ''
    }
  },

  _setExpression(text) {
    const { expression } = this.state;
    this.setState({
      expression: text
    });
  },

  _addToExpression(text) {
    const { expression } = this.state;
    this.setState({
      expression: expression + text
    });
  },

  _clearExpression() {
    this._setExpression('');
  },

  _backspace() {
    const { expression } = this.state;
    this.setState({
      expression: expression.substr(0, expression.length - 1)
    });
  },

  _evaluateExpression() {
    const { expression } = this.state;
    console.warn('TODO: Obviously not this... Use the MathSlinger (GET /math)!');
    /*
     Should be something like....
     request.get('${mathSlingerBaseUrl}/math')
     .send(expression)
     .end((err, res) => this._setExpression(res.body))
     */
    this.setState({
      expression: eval(expression)
    });
  },

  render() {

    const { expression } = this.state;

    return (
      <div>
        <Well style={{width: CALC_WIDTH, margin: 'auto'}}>
          <Input type="text" bsSize="large" disabled value={expression} placeholder="Example: 2+3*4"/>

          <Row>
            <Col xs={9}>
              {[[7, 8, 9], [4, 5, 6], [1, 2, 3], [0, '.']].map((row, rowI) =>
                <div key={rowI}>
                  {row.map(val =>
                    <CalcButton key={val} text={val} onClick={this._addToExpression.bind(this, val)} />
                  )}
                </div>
              )}
              <CalcButton text="DEL" onClick={this._backspace} />
              <CalcButton text="AC" onClick={this._clearExpression} style={{width: BTN_HEIGHT * 2}} />
            </Col>

            <Col xs={3}>
              {['+', '-', '*', '/'].map(val =>
                <CalcButton key={val} text={val} onClick={this._addToExpression.bind(this, val)} style={{display: 'block'}} />
              )}
              <CalcButton text="=" style={{display: 'block', clear: 'both'}} onClick={this._evaluateExpression} />
            </Col>
          </Row>

        </Well>
      </div>
    );
  }
});

const CalcButton = React.createClass({
  render() {
    const { text, style, ...others } = this.props;
    const buttonStyle = Object.assign({
      width: BTN_HEIGHT,
      height: BTN_HEIGHT,
      borderRadius: 0
    }, style);
    return (
      <Button
        style={buttonStyle}
        bsSize="large"
        {...others}
      >
        {text}
      </Button>
    );
  }
});

export default Calculator;
