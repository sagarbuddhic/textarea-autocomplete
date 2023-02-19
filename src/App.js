import "./App.css";
import TextareaAutocomplete from "./TextareaAutocomplete";

const suggestionsDummy = [
  "FILTER_DIFF",
  "WHERE",
  "COLUMN_TYPE",
  "COLUMN_NAME",
  "TABLE_NAME",
  "LIKE",
  "=",
  "!=",
  "NOT",
  "INTEGER",
  "DATETIME",
  "STRING",
  "AND",
  "OR",
];
function App(props) {
  const handleInput = (input) => {};
  return (
    <div>
      <TextareaAutocomplete
        suggestions={props.suggestions || suggestionsDummy}
        showSuggestionStartsWith
        handleInput={handleInput}
        placeholder="Enter Value"
        value=""
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

// let inner = editDiv?.current?.innerHTML;
// //split multiline content
// let splitInner = inner
//   .replace("<div><br></div>", "")
//   .split("<div>");

// if (splitInner.length > 0) {
//   // fetch last value
//   let lastLine;
//   lastLine = splitInner[splitInner.length - 1];
//   let lastLineSplit = lastLine?.split(" ");
//   lastLineSplit.pop();
//   lastLineSplit.push(
//     `${filteredSuggestions[highlightedOption]}</div>`
//   );
//   let updatedLastLine = lastLineSplit.join(" ");
//   splitInner.pop();
//   splitInner.push(updatedLastLine);
//   editDiv.current.innerHTML = splitInner.join("<div>");
// }

// var currentNode = selection.focusNode;
// const inputRange = document.createRange();
// inputRange.selectNodeContents(editDiv.current);
// inputRange.collapse(false);
// selection.removeAllRanges();
// selection.addRange(inputRange);

// inputRange.setStart(currentNode, 0);
// inputRange.collapse(true);

// console.log("cur", currentNode.textContent.split(" "));
// selection.removeAllRanges();
// selection.addRange(inputRange);

// var currentNodeText = selection?.focusNode?.innerText;

// cursor move
// let newLinesContent = contentLeft
//   .split("\n")
//   .filter((val) => val !== "");
// let cursorMoveWords = [];
// newLinesContent.forEach((element) => {
//   cursorMoveWords.push(
//     element.split(" ").filter((val) => val !== "")
//   );
// });
// selection.collapse(editDiv.current, 4);
