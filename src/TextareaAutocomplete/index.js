import React, { useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useRef } from "react";
import "./index.css";

const TextareaAutocomplete = (props) => {
  const {
    suggestions,
    handleInput,
    editableStyle,
    showSuggestionWithNoInput,
    showSuggestionStartsWith,
    placeholder,
    value,
    handleFocus,
  } = props;
  const [listTop, setListTop] = useState(0);
  const [listLeft, setListLeft] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [highlightedOption, setHighlightedOption] = useState(0);
  const [content, setContent] = useState("");
  const [prevContent, setPrevContent] = useState("");
  const editDiv = useRef(null);
  const [editableFocus, setEditableFocus] = useState(false);

  const isSelected = (highlighted, item, index) => {
    if (highlighted) {
      if (highlighted === item) return true;
    } else {
      if (index === 0) return true;
    }
    return false;
  };

  useEffect(() => {
    if (value != null && editDiv?.current) {
      editDiv.current.innerText = value;
    }
  }, [value]);
  return (
    <div className="editableWrapper">
      <div
        className="editableAutocomplete"
        data-content={placeholder}
        ref={editDiv}
        onKeyUp={(e) => {
          if (
            !editDiv ||
            !editDiv.current ||
            (e.key === "ArrowLeft" && e.shiftKey) ||
            (e.key.toLowerCase() === "a" && e.ctrlKey)
          ) {
            return;
          }

          if (e.key === "Escape") {
            setFilteredSuggestions([]);
            setHighlightedOption(0);
            return;
          }

          if (e.code === "Space") {
            setHighlightedOption(0);
            if (showSuggestionWithNoInput) {
              setFilteredSuggestions(suggestions);
            }
          }

          if (!editDiv.current.innerText && showSuggestionWithNoInput) {
            setFilteredSuggestions(suggestions);
            setHighlightedOption(0);
          }

          let innerText = editDiv.current.innerText;
          let ignoreFilter =
            (filteredSuggestions.length > 0 && innerText.endsWith("\n")) ||
            [
              "Enter",
              "ArrowUp",
              "ArrowDown",
              "Shift",
              "ArrowLeft",
              "ArrowRight",
              "AltLeft",
              "AltRight",
              "Control",
            ].includes(e.key);

          if (!ignoreFilter) {
            let contentArr = [...content];
            let diffIndex = 0;
            [...innerText].every((val, index) => {
              diffIndex = index;
              return val === contentArr[index];
            });

            let contentLeft = innerText.substring(0, diffIndex + 1);
            if (
              e.key === "Backspace" &&
              contentLeft.length !== innerText.length
            ) {
              contentLeft = innerText.substring(0, diffIndex);
            }
            let AllWords = contentLeft.split(/[\s]+/);

            let lastWord =
              AllWords.length > 0 ? AllWords[AllWords.length - 1] : "";
            let lastWordLower = lastWord.toString().toLowerCase();

            let allSuggestions = [...suggestions];

            let filtered = allSuggestions.filter((suggestion) => {
              let listItem = suggestion?.toString().toLowerCase();
              let listItemArray = listItem?.split(" ");

              let satisfiesCondition = listItemArray.some((item) => {
                if (showSuggestionStartsWith) {
                  return lastWordLower !== "" && item.startsWith(lastWordLower);
                } else {
                  return lastWordLower !== "" && item.includes(lastWordLower);
                }
              });
              return satisfiesCondition;
            });

            setFilteredSuggestions(filtered);
          }

          if (filteredSuggestions.length > 0) {
            e.preventDefault();
            if (!["Enter", "ArrowUp", "ArrowDown"].includes(e.key)) {
              setHighlightedOption(0);
            }
            let updatedHighlightedOption = highlightedOption;

            if (e.key === "ArrowDown") {
              updatedHighlightedOption =
                highlightedOption >= filteredSuggestions.length - 1
                  ? 0
                  : highlightedOption + 1;
            }

            if (e.key === "ArrowUp") {
              if (highlightedOption !== 0) {
                updatedHighlightedOption = highlightedOption - 1;
              }
            }

            if (["ArrowDown", "ArrowUp"].includes(e.key)) {
              setHighlightedOption(updatedHighlightedOption);
              let element = document.getElementsByClassName(
                `list${updatedHighlightedOption}`
              );
              element &&
                element[0]?.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                  inline: "nearest",
                });
            }

            if (e.key === "Enter") {
              let prevContArr = [...prevContent];
              let contArr = [...content];
              let enterIndex = 0;
              if (prevContent.length > content.length) {
                prevContArr.every((val, index) => {
                  enterIndex = index;
                  return val === contArr[index];
                });
              } else {
                contArr.every((val, index) => {
                  enterIndex = index;
                  return val === prevContArr[index];
                });
                enterIndex += 1;
              }

              let contentLeft = content.substring(0, enterIndex);
              let contentRight = content.substring(enterIndex);

              let endIndexOfLeft = Math.max(
                contentLeft.lastIndexOf(" "),
                contentLeft.lastIndexOf("\n")
              );
              contentLeft = `${contentLeft.substring(0, endIndexOfLeft + 1)}${
                filteredSuggestions[highlightedOption]
              }`;
              editDiv.current.innerText = contentLeft + contentRight;

              // let cursorMoveWords = contentLeft
              //   .split(/[\s]+/)
              //   .filter((val) => val !== "");

              // cursorMoveWords.forEach(() => {
              //   sel.modify("move", "forward", "word");
              // });
              // sel.modify("move", "forward", "word");

              // editDiv.current.focus();
              let sel = window.getSelection();
              let sentences = editDiv.current.innerText.split("\n");
              let contentLeftLength = contentLeft.replaceAll("\n", "").length;
              let childIndex = 0;
              sentences.every((sentence) => {
                if (contentLeftLength > sentence.length) {
                  contentLeftLength = contentLeftLength - sentence.length;
                  childIndex = childIndex + 2;
                  return true;
                }
                return false;
              });
              childIndex =
                childIndex > editDiv.current.childNodes.length
                  ? childIndex - 1
                  : childIndex;

              const inputRange = document.createRange();
              inputRange.setStart(
                editDiv.current.childNodes[childIndex],
                contentLeftLength
              );
              inputRange.collapse(true);
              sel.removeAllRanges();
              sel.addRange(inputRange);

              setFilteredSuggestions([]);
            }
          }

          if (window) {
            let selection = window.getSelection();
            let rangeAt = selection.getRangeAt(0);
            let range = rangeAt.cloneRange();
            let clientRects = range.getClientRects();

            if (clientRects && clientRects.length > 0) {
              let rect = clientRects[0];
              if (rect) {
                setListTop(rect.top);
                setListLeft(rect.left);
              }
            }
          }

          setPrevContent(content);
          setContent(editDiv.current.innerText);
          handleInput(editDiv.current.innerText);
        }}
        onKeyDown={(e) => {
          if (
            ["ArrowDown", "ArrowUp", "Enter"].includes(e.key) &&
            filteredSuggestions.length > 0
          ) {
            e.preventDefault();
          }
        }}
        style={{
          border: editableFocus ? "1px solid black" : "1px solid lightgrey",
          padding: "5px 7px",
          whiteSpace: "pre-wrap",
          fontSize: "12px",
          borderRadius: "3px",
          minHeight: "80px",
          width: "auto",
          ...editableStyle,
        }}
        contentEditable="true"
        onFocus={(e) => {
          handleFocus(e);
          if (showSuggestionWithNoInput && !content) {
            setFilteredSuggestions(suggestions);
            setHighlightedOption(0);
          }
          setEditableFocus(true);
        }}
        onBlur={() => {
          setEditableFocus(false);
          setFilteredSuggestions([]);
          setHighlightedOption(0);
        }}
        onMouseEnter={() => {
          setEditableFocus(true);
        }}
        onMouseLeave={() => {
          setEditableFocus(false);
        }}
        onInput={(e) => {
          // if (
          //   !(
          //     e.currentTarget.innerText.endsWith("\n") &&
          //     filteredSuggestions.length > 0
          //   )
          // ) {
          //   let contentArr = [...content];
          //   let diffIndex = 0;
          //   [...e.currentTarget.innerText].every((val, index) => {
          //     diffIndex = index;
          //     return val === contentArr[index];
          //   });
          //   let contentLeft = e.currentTarget.innerText.substring(
          //     0,
          //     diffIndex + 1
          //   );
          //   console.log(`left`, contentLeft);
          //   // let endIndexOfLeft = Math.max(
          //   //   contentLeft.lastIndexOf(" "),
          //   //   contentLeft.lastIndexOf("\n"),
          //   //   diffIndex
          //   // );
          //   // let innerTextWords = e.currentTarget.innerText;
          //   let AllWords = contentLeft.split(/[\s]+/);
          //   console.log(AllWords);
          //   let lastWord =
          //     AllWords.length > 0 ? AllWords[AllWords.length - 1] : "";
          //   let lastWordLower = lastWord.toString().toLowerCase();
          //   let allSuggestions = [...suggestions];
          //   let filtered = allSuggestions.filter((suggestion) => {
          //     let listItem = suggestion?.toString().toLowerCase();
          //     let listItemArray = listItem?.split(" ");
          //     let satisfiesCondition = listItemArray.some((item) => {
          //       if (showSuggestionStartsWith) {
          //         return lastWordLower !== "" && item.startsWith(lastWordLower);
          //       } else {
          //         return lastWordLower !== "" && item.includes(lastWordLower);
          //       }
          //     });
          //     return satisfiesCondition;
          //   });
          //   setFilteredSuggestions(filtered);
          // }
        }}
      ></div>
      <ul
        // onMouseLeave={(e) => {
        //   setHighlightedOption(0);
        // }}
        style={{
          pointerEvents: "fill",
          cursor: "pointer",
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          fontSize: "11px",
          letterSpacing: "var(--letter-spacing-12)",
          padding: "8px 0",
          margin: 0,
          maxHeight: "200px",
          overflowY: "auto",
          position: "fixed",
          top: `${listTop + 13}px`,
          left: `${listLeft + 2}px`,
          zIndex: "9999",
          visibility:
            filteredSuggestions.length > 0 && listLeft > 0 && listTop > 0
              ? "visible"
              : "hidden",
          border: "1px solid hsla(216, 41%, 87%, 0.8)",
          borderRadius: "6px",
          boxShadow: "0 4px 16px rgb(149 157 165 / 10%)",
          background: "white",
          color: "black",
        }}
      >
        {filteredSuggestions.map((item, index) => {
          return (
            <li
              onMouseEnter={(e) => {
                setHighlightedOption(index);
              }}
              onMouseDown={(e) => {
                let prevContArr = [...prevContent];
                let contArr = [...content];
                let enterIndex = 0;
                if (prevContent.length > content.length) {
                  prevContArr.every((val, index) => {
                    enterIndex = index;
                    return val === contArr[index];
                  });
                } else {
                  contArr.every((val, index) => {
                    enterIndex = index;
                    return val === prevContArr[index];
                  });
                  enterIndex += 1;
                }

                let contentLeft = content.substring(0, enterIndex);
                let contentRight = content.substring(enterIndex);

                let endIndexOfLeft = Math.max(
                  contentLeft.lastIndexOf(" "),
                  contentLeft.lastIndexOf("\n")
                );
                contentLeft = `${contentLeft.substring(0, endIndexOfLeft + 1)}${
                  filteredSuggestions[highlightedOption]
                }`;
                editDiv.current.innerText = contentLeft + contentRight;

                let sel = window.getSelection();
                let sentences = editDiv.current.innerText.split("\n");
                let contentLeftLength = contentLeft.replaceAll("\n", "").length;
                let childIndex = 0;
                sentences.every((sentence) => {
                  if (contentLeftLength > sentence.length) {
                    contentLeftLength = contentLeftLength - sentence.length;
                    childIndex = childIndex + 2;
                    return true;
                  }
                  return false;
                });
                childIndex =
                  childIndex > editDiv.current.childNodes.length
                    ? childIndex - 1
                    : childIndex;

                const inputRange = document.createRange();
                inputRange.setStart(
                  editDiv.current.childNodes[childIndex],
                  contentLeftLength
                );
                inputRange.collapse(true);
                sel.removeAllRanges();
                sel.addRange(inputRange);

                setFilteredSuggestions([]);
                setPrevContent(content);
                setContent(editDiv.current.innerText);
              }}
              className={`list${index}`}
              key={index}
              style={{
                padding: "4px 16px",
                backgroundColor: isSelected(
                  filteredSuggestions[highlightedOption],
                  item,
                  index
                )
                  ? "hsl(213, 71%, 90%)"
                  : "white",
                color: isSelected(
                  filteredSuggestions[highlightedOption],
                  item,
                  index
                )
                  ? "black"
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
  editableStyle: PropTypes.object,
  suggestions: PropTypes.array,
  handleInput: PropTypes.func,
  showSuggestionWithNoInput: PropTypes.bool,
  showSuggestionStartsWith: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  handleFocus: PropTypes.func,
};

TextareaAutocomplete.defaultProps = {
  suggestions: [
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
  ],
  placeholder: "",
  handleInput: () => {},
  editableStyle: {
    border: "1px solid darkgray",
  },
  showSuggestionWithNoInput: false,
  showSuggestionStartsWith: false,
  value: null,
  handleFocus: () => {},
};

export default TextareaAutocomplete;
