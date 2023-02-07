# Text Area With AutoComplete

## Description
### MIT License

This Component provides a text area where we can pass an array of options which will be available in the form of autocomplete.

## Props

| Props       | Type        | Description                                   |
| ----------- | ----------- | --------------------------------------------  |
| suggestions | Array       | list of values for autocomplete               |
| onInput     | Callback    | Callback with text inside textarea as argument|
|             |             | executed when a text is entered.              |
|editableStyle| object      |  style object for div edit                    |

## Example Props

``` TextareaAutocomplete.defaultProps = {
  suggestions: [
    "Addition",
    "Ball",
    "Call",
    "Date",
    "Test",
    "Height",
    "Condition",
  ],
  handleInput: (input) => {
    console.log(input);
  },
  editableStyle: {
    minHeight: "80px",
    width: "500px",
    border: "1px solid darkgray",
  },
}; ```