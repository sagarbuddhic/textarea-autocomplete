import React, { useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useRef } from "react";

const TextareaAutocomplete = (props) => {
  const { suggestions, onInput } = props;
  const [listTop, setListTop] = useState(0);
  const [listLeft, setListLeft] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [highlightedOption, setHighlightedOption] = useState(0);
  const [content, setContent] = useState("");
  const editDiv = useRef(null);

  const isSelected = (highlighted, item, index) => {
    if (highlighted) {
      if (highlighted === item) return true;
    } else {
      if (index === 0) return true;
    }
    return false;
  };

  useEffect(() => {});

  return (
    <div>
      <div
        ref={editDiv}
        onKeyUp={(e) => {
          let selection = window.getSelection();
          let rangeAt = selection.getRangeAt(0);
          let range = rangeAt.cloneRange();
          let clientRects = range.getClientRects();

          if (clientRects && clientRects.length > 0) {
            let rect = clientRects[0];
            if (rect) {
              setListTop(rect.top + window.scrollY);
              setListLeft(rect.left);
            }
          }

          if (filteredSuggestions.length > 0) {
            if (e.key === "ArrowDown") {
              if (highlightedOption >= filteredSuggestions.length - 1) {
                setHighlightedOption(0);
              } else {
                let highlightedOption1 = highlightedOption + 1;
                setHighlightedOption(highlightedOption1);
              }
            }

            if (e.key === "ArrowUp") {
              if (highlightedOption !== 0) {
                setHighlightedOption(highlightedOption - 1);
              }
            }

            if (e.key === "Enter") {
              let splitContent = content?.split(" ");
              if (splitContent.length > 0) {
                splitContent.pop();
              }
              editDiv.current.textContent = `${splitContent.join(" ")} ${
                filteredSuggestions[highlightedOption]
              } `;

              const inputRange = document.createRange();
              inputRange.selectNodeContents(editDiv.current);
              inputRange.collapse(false);
              selection.removeAllRanges();
              selection.addRange(inputRange);

              setFilteredSuggestions([]);
            }

            if (!["Enter", "ArrowUp", "ArrowDown"].includes(e.key)) {
              setHighlightedOption(0);
            }
          }
        }}
        style={{
          minHeight: "80px",
          width: "500px",
          border: "1px solid lightgrey",
          padding: "5px 7px",
          whiteSpace: "pre-wrap",
        }}
        contentEditable="true"
        onInput={(e) => {
          let allSuggestions = [...suggestions];

          let inputContent = e.currentTarget.textContent
            .toString()
            .toLowerCase();
          let AllWords = inputContent.split(" ");
          let lastWord =
            AllWords.length > 0 ? AllWords[AllWords.length - 1] : "";

          let filtered = allSuggestions.filter((suggestion) => {
            let listItem = suggestion?.toString().toLowerCase();
            let listItemArray = listItem?.split(" ");
            let satisfiesCondition = listItemArray.some((item) => {
              return (
                lastWord !== "" &&
                item.startsWith(lastWord.toString().toLowerCase())
              );
            });
            return satisfiesCondition;
          });

          setContent(e.currentTarget.textContent);
          setFilteredSuggestions(filtered);
          onInput(e.currentTarget.textContent);
        }}
      >
        {/* &#8203; */}
      </div>
      <ul
        style={{
          position: "absolute",
          top: `${listTop + 15}px`,
          left: `${listLeft}px`,
          listStyle: "none",
          fontSize: "13px",
          letterSpacing: "var(--letter-spacing-14)",
          zIndex: "9999",
          display: "flex",
          visibility: filteredSuggestions.length > 0 ? "visible" : "hidden",
          flexDirection: "column",
          border: "1px solid hsla(216, 41%, 87%, 0.8)",
          borderRadius: "6px",
          boxShadow: "0 8px 24px rgb(149 157 165 / 20%)",
          background: "white",
          color: "black",
          padding: "8px 0",
          margin: 0,
        }}
      >
        {filteredSuggestions.map((item, index) => {
          return (
            <li
              key={index}
              style={{
                padding: "4px 16px",
                backgroundColor: isSelected(
                  filteredSuggestions[highlightedOption],
                  item,
                  index
                )
                  ? "hsl(243, 93%, 67%)"
                  : "white",
                color: isSelected(
                  filteredSuggestions[highlightedOption],
                  item,
                  index
                )
                  ? "white"
                  : "black",
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

TextareaAutocomplete.propTypes = {
  suggestions: PropTypes.array,
  onInput: PropTypes.func,
};

TextareaAutocomplete.defaultProps = {
  suggestions: ["Addition", "Ball", "Test", "Height", "Condition"],
  onInput: () => {},
};

export default TextareaAutocomplete;

// <textarea
//           name=""
//           id=""
//           cols="60"
//           rows="10"
//           onKeyUp={(e) => {
//             console.log(`selection`, window.getSelection());
//             console.log(`range`, window.getSelection().getRangeAt(0));
//             console.log(
//               `clone range`,
//               window.getSelection().getRangeAt(0).cloneRange()
//             );
//             let range = window.getSelection().getRangeAt(0).cloneRange();
//             console.log(`range`, range);
//             if (range.getClientRects()) {
//               range.collapse(true);
//               let rect = range.getClientRects()[0];
//               if (rect) {
//                 setListTop(rect.top + window.scrollY);
//                 setListLeft(rect.left);
//                 console.log(`y`, rect.top);
//                 console.log(`x`, rect.left);
//               }
//             }
//             console.log(
//               `test`,
//               document.getSelection().getRangeAt(0).getBoundingClientRect()
//             );
//             console.log(`off left`, e.target.offsetLeft);
//             console.log(`off top`, e.target.offsetTop);
//             console.log(`selection start`);
//             console.log(`window scrolltop`, window.scrollY);
//           }}
//         ></textarea>

// let inputHTML = e.currentTarget.innerHTML;
//             let inputContent = inputHTML
//               ?.replaceAll("<div>", " ")
//               .replaceAll("<div></div>", " ")
//               .replaceAll("</div><div>", " ")
//               .replaceAll("</div>", "")
//               .replaceAll("<br>", "")
//               .toString()
//               .toLowerCase();
