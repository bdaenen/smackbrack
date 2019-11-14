import React from "react";
import AsyncSelect from "react-select/async";
import { smashtrack } from "../../api/smashtrack";

export default class User extends React.Component {
  getOptions = (input, callback) => {
    smashtrack
      .get(`/users/select?pageSize=1000`, {
        params: {
          q: input
        },
        withCredentials: true
      })
      .then(response => {
        callback(
          response.data.results.map(({ text, id }) => ({
            label: text,
            value: id
          }))
        );
      });
  };

  render() {
    return (
      <AsyncSelect
        cacheOptions
        defaultOptions
        isMulti
        loadOptions={this.getOptions}
        {...this.props}
      />
    );
  }
}
