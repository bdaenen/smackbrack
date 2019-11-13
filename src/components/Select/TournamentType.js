import React, { Component } from 'react'
import Select from 'react-select'

const options = [
  { value: 'double elimination', label: 'Double Elimination' },
  { value: 'round robin', label: 'Round Robin' },
  { value: 'swiss', label: 'Swiss' },
  { value: 'single elimination', label: 'Single Elimination' }
];

export default (props) => (
  <Select options={options} {...props} />
);