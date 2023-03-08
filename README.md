# Text Area With AutoComplete

## Description
### MIT License

This Component provides a text area where we can pass an array of options which will be available in the form of autocomplete.

## Props

| Props                    | Type        | Description                                                                     |
| -----------              | ----------- | --------------------------------------------                                    |
| suggestions              | Array       | list of values for autocomplete                                                 |
| handleInput              | Callback    | called when input is changed with input text as argument                        |
| editableStyle            | object      |  style object for div edit                                                      |
| placeholder              | string      |  placeholder                                                                    |
|showSuggestionWithNoInput | bool        |  show suggestion without entering any input, ex on space                        |
|showSuggestionStartsWith  | bool        |  show suggestion which starts with input entered                                |
|value                     | string      |  update innerText by passing the value or null to not affect the innerText      |
|handleFocus               | func        |  called when textarea is focussed                                               |
|tabIndex                  | string      |                                                |

## Usage

```
import TextareaAutocomplete from "textarea-autocomplete";
```

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
  showSuggestionWithNoInput: false,
  showSuggestionStartsWith: false,
}; ```