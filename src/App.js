import "./App.css";
import TextareaAutocomplete from "./TextareaAutocomplete";

const suggestions = ["Column", "Column like", "Object", "And", "Or"];
function App(props) {
  return (
    <div>
      <TextareaAutocomplete suggestions={suggestions} onInput={props.onInput} />
    </div>
  );
}

export default App;
