export default TextareaAutocomplete;
declare function TextareaAutocomplete(props: any): JSX.Element;
declare namespace TextareaAutocomplete {
  namespace propTypes {
    const editableStyle: any;
    const suggestions: any;
    const handleInput: any;
    const showSuggestionWithNoInput: any;
    const showSuggestionStartsWith: any;
    const placeholder: any;
    const value: any;
    const handleFocus: any;
  }
  namespace defaultProps {
    const suggestions_1: string[];
    export { suggestions_1 as suggestions };
    const placeholder_1: string;
    export { placeholder_1 as placeholder };
    export function handleInput_1(): void;
    export { handleInput_1 as handleInput };
    export namespace editableStyle_1 {
      const border: string;
    }
    export { editableStyle_1 as editableStyle };
    const showSuggestionWithNoInput_1: boolean;
    export { showSuggestionWithNoInput_1 as showSuggestionWithNoInput };
    const showSuggestionStartsWith_1: boolean;
    export { showSuggestionStartsWith_1 as showSuggestionStartsWith };
    const value_1: any;
    export { value_1 as value };
    export function handleFocus_1(): void;
    export { handleFocus_1 as handleFocus };
  }
}
//# sourceMappingURL=index.d.ts.map
//tsc -d --declarationDir src/TextareaAutocomplete --declarationMap --emitDeclarationOnly
