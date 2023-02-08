import React, { useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useRef } from "react";
const TextareaAutocomplete = props => {
  const {
    suggestions,
    handleInput,
    editableStyle,
    showSuggestionWithNoInput
  } = props;
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
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    ref: editDiv,
    onKeyUp: e => {
      // let editDivRect = editDiv.current.getBoundingClientRect();

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
      if (filteredSuggestions.length > 0) {
        if (!["Enter", "ArrowUp", "ArrowDown"].includes(e.key)) {
          setHighlightedOption(0);
        }
        if (e.key === "ArrowDown") {
          if (highlightedOption >= filteredSuggestions.length - 1) {
            setHighlightedOption(0);
          } else {
            let highlightedOption1 = highlightedOption + 1;
            setHighlightedOption(highlightedOption1);
          }
          let className = `list${highlightedOption + 1 < filteredSuggestions.length ? highlightedOption + 1 : 0}`;
          let element = document.getElementsByClassName(className);
          element && element[0]?.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest"
          });
        }
        if (e.key === "ArrowUp") {
          if (highlightedOption !== 0) {
            setHighlightedOption(highlightedOption - 1);
          }
          let className = `list${highlightedOption - 1 > 0 ? highlightedOption - 1 : 0}`;
          let element = document.getElementsByClassName(className);
          element && element[0]?.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest"
          });
        }
        if (e.key === "Enter") {
          let inner = editDiv?.current?.innerHTML;
          //split multiline content
          let splitInner = inner.replace("<div><br></div>", "").split("<div>");
          if (splitInner.length > 0) {
            // fetch last value
            let lastLine;
            lastLine = splitInner[splitInner.length - 1];
            let lastLineSplit = lastLine?.split(" ");
            lastLineSplit.pop();
            lastLineSplit.push(`${filteredSuggestions[highlightedOption]}</div>`);
            let updatedLastLine = lastLineSplit.join(" ");
            splitInner.pop();
            splitInner.push(updatedLastLine);
            editDiv.current.innerHTML = splitInner.join("<div>");
          }
          const inputRange = document.createRange();
          inputRange.selectNodeContents(editDiv.current);
          inputRange.collapse(false);
          selection.removeAllRanges();
          selection.addRange(inputRange);
          setFilteredSuggestions([]);
        }
      }
      if (e.key === "Escape") {
        setFilteredSuggestions([]);
        setHighlightedOption(0);
      } else if (showSuggestionWithNoInput) {
        if (e.code === "Space") {
          setFilteredSuggestions(suggestions);
          setHighlightedOption(0);
        } else if (!editDiv.current.textContent) {
          setFilteredSuggestions(suggestions);
        }
      }
      setContent(editDiv.current.textContent);
      handleInput(editDiv.current.textContent);
    },
    style: {
      border: "1px solid lightgrey",
      padding: "5px 7px",
      whiteSpace: "pre-wrap",
      fontSize: "12px",
      ...editableStyle
    },
    contentEditable: "true",
    onFocus: () => {
      if (showSuggestionWithNoInput && !content) {
        setFilteredSuggestions(suggestions);
        setHighlightedOption(0);
      }
    },
    onInput: e => {
      if (!(e.currentTarget.innerText.endsWith("\n") && filteredSuggestions.length > 0)) {
        let allSuggestions = [...suggestions];
        let innerTextWords = e.currentTarget.innerText;
        let AllWords = innerTextWords.split(/[\s]+/);
        let lastWord = AllWords.length > 0 ? AllWords[AllWords.length - 1] : "";
        let filtered = allSuggestions.filter(suggestion => {
          let listItem = suggestion?.toString().toLowerCase();
          let listItemArray = listItem?.split(" ");
          let satisfiesCondition = listItemArray.some(item => {
            return lastWord !== "" && item.startsWith(lastWord.toString().toLowerCase());
          });
          return satisfiesCondition;
        });
        setFilteredSuggestions(filtered);
      }
    }
  }), /*#__PURE__*/React.createElement("ul", {
    style: {
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
      visibility: filteredSuggestions.length > 0 ? "visible" : "hidden",
      border: "1px solid hsla(216, 41%, 87%, 0.8)",
      borderRadius: "6px",
      boxShadow: "0 4px 16px rgb(149 157 165 / 10%)",
      background: "white",
      color: "black"
    }
  }, filteredSuggestions.map((item, index) => {
    return /*#__PURE__*/React.createElement("li", {
      className: `list${index}`,
      key: index,
      style: {
        padding: "4px 16px",
        backgroundColor: isSelected(filteredSuggestions[highlightedOption], item, index) ? "hsl(243, 93%, 67%)" : "white",
        color: isSelected(filteredSuggestions[highlightedOption], item, index) ? "white" : "black"
      }
    }, item);
  })));
};
TextareaAutocomplete.propTypes = {
  editableStyle: PropTypes.object,
  suggestions: PropTypes.array,
  handleInput: PropTypes.func,
  showSuggestionWithNoInput: PropTypes.bool
};
TextareaAutocomplete.defaultProps = {
  suggestions: ["Addition", "Ball", "Call", "Date", "Test", "Height", "Condition"],
  handleInput: input => {},
  editableStyle: {
    minHeight: "80px",
    width: "500px",
    border: "1px solid darkgray"
  },
  showSuggestionWithNoInput: false
};
export default TextareaAutocomplete;