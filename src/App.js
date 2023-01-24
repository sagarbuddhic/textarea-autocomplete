import "./App.css";
import TextareaAutocomplete from "./TextareaAutocomplete";

const suggestionsDummy = ["Addition", "Ball", "Test", "Height", "Condition"];
function App(props) {
  return (
    <div>
      <TextareaAutocomplete
        suggestions={props.suggestions || suggestionsDummy}
        onInput={props.onInput}
      />
    </div>
  );
}

export default App;
