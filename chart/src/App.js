import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import './App.css';
import {PERIOD} from './API'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';
import {fetchAPI} from './actions'
import { bindActionCreators } from 'redux';

function App(props) {
  const {data, period, param, changePeriod, changeParam, fetchAPI} = props
  const renderButton = (label, period, activePeriod) => (<button 
  disabled={activePeriod == period ? true : false} 
  onClick={() => changePeriod(period)}>{label}</button>)
  const Label = props => {
      const {
        x, y, stroke, value,
      } = props;
  
      return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
  }

  // fetch API data
  useEffect(() => {
    fetchAPI()
  }, [period])

  return (
    <div className="Card">
      <h3 className="title">{data.isin} <small>{data.currency}</small></h3>
      <div className="info">
        <div>{data.isin}</div>
        <div>{data.info}</div>
      </div>
      <hr/>
      <div className="period-btn-group">
        {renderButton('Week',PERIOD.WEEK, period)}
        {renderButton('Month',PERIOD.MONTH, period)}
        {renderButton('Quarter',PERIOD.QUARTER, period)}
        {renderButton('Year',PERIOD.YEAR, period)}
        {renderButton('Max',PERIOD.MAX, period)}
      </div>
      <div className="chart-wrapper">
        <div className="chart">
        <ResponsiveContainer height={300} width="100%">
          <LineChart width={500} height={300} data={data.data}>
            <XAxis interval="preserveStartEnd" dataKey="date"/>
            <YAxis type="number" domain={[0, 100]} dataKey={param}/>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line type="monotone" dataKey={param} stroke="#8884d8" label={<Label/>} />
          </LineChart>
        </ResponsiveContainer>
        </div>
        <div className="param-wrapper">
          <select onChange={changeParam} value={param}>
            <option value="yield">Yield</option>
            <option value="spread">Spread</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    period: state.period,
    param: state.param
  }
}

const mapDispatchToProps = (dispatch, getState) => ({
  changeParam: event => {
    dispatch({ type: 'CHANGE_PARAM', payload: event.currentTarget.value })
  },
  changePeriod: (period) => {
    dispatch({ type: 'CHANGE_PERIOD', payload: period })
  },
  ...bindActionCreators({
    fetchAPI
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
