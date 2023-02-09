import "./App.css";
import TextareaAutocomplete from "./TextareaAutocomplete";

const suggestionsDummy = [
  "IGNORE_DIFF",
  "FILTER_DIFF",
  "WHERE",
  "COLUMN_TYPE",
  "COLUMN_NAME",
  "TABLE_NAME",
  "LIKE",
  "=",
  "INTEGER",
  "DATETIME",
  "STRING",
];
function App(props) {
  const handleInput = (input) => {
    console.log(JSON.stringify(input.replaceAll("\n", " ")));
  };
  return (
    <div>
      <TextareaAutocomplete
        suggestions={props.suggestions || suggestionsDummy}
        handleInput={handleInput}
        placeholder="test"
        editableStyle={
          {
            // border: "1px solid red",
          }
        }
      />
    </div>
  );
}

export default App;
