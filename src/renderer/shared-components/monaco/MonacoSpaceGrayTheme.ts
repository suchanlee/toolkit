import { editor } from "monaco-editor";

export const MonacoSpaceGrayTheme: editor.IStandaloneThemeData = {
  base: "vs-dark",
  inherit: true,
  rules: [
    {
      foreground: "c0c5ce",
      token: "variable.parameter.function"
    },
    {
      foreground: "65737e",
      token: "comment"
    },
    {
      foreground: "65737e",
      token: "punctuation.definition.comment"
    },
    {
      foreground: "c0c5ce",
      token: "punctuation.definition.string"
    },
    {
      foreground: "c0c5ce",
      token: "punctuation.definition.variable"
    },
    {
      foreground: "c0c5ce",
      token: "punctuation.definition.string"
    },
    {
      foreground: "c0c5ce",
      token: "punctuation.definition.parameters"
    },
    {
      foreground: "c0c5ce",
      token: "punctuation.definition.string"
    },
    {
      foreground: "c0c5ce",
      token: "punctuation.definition.array"
    },
    {
      foreground: "c0c5ce",
      token: "none"
    },
    {
      foreground: "c0c5ce",
      token: "keyword.operator"
    },
    {
      foreground: "b48ead",
      token: "keyword"
    },
    {
      foreground: "b48ead",
      token: "keyword.operator.logical.python"
    },
    {
      foreground: "bf616a",
      token: "variable"
    },
    {
      foreground: "bf616a",
      token: "variable.other.dollar.only.js"
    },
    {
      foreground: "8fa1b3",
      token: "entity.name.function"
    },
    {
      foreground: "8fa1b3",
      token: "meta.require"
    },
    {
      foreground: "8fa1b3",
      token: "support.function.any-method"
    },
    {
      foreground: "8fa1b3",
      token: "variable.function"
    },
    {
      foreground: "ebcb8b",
      token: "support.class"
    },
    {
      foreground: "ebcb8b",
      token: "entity.name.class"
    },
    {
      foreground: "ebcb8b",
      token: "entity.name.type.class"
    },
    {
      foreground: "eff1f5",
      token: "meta.class"
    },
    {
      foreground: "8fa1b3",
      token: "keyword.other.special-method"
    },
    {
      foreground: "b48ead",
      token: "storage"
    },
    {
      foreground: "96b5b4",
      token: "support.function"
    },
    {
      foreground: "a3be8c",
      token: "string"
    },
    {
      foreground: "a3be8c",
      token: "constant.other.symbol"
    },
    {
      foreground: "a3be8c",
      token: "entity.other.inherited-class"
    },
    {
      foreground: "d08770",
      token: "constant.numeric"
    },
    {
      foreground: "d08770",
      token: "none"
    },
    {
      foreground: "d08770",
      token: "none"
    },
    {
      foreground: "d08770",
      token: "constant"
    },
    {
      foreground: "bf616a",
      token: "entity.name.tag"
    },
    {
      foreground: "d08770",
      token: "entity.other.attribute-name"
    },
    {
      foreground: "8fa1b3",
      token: "entity.other.attribute-name.id"
    },
    {
      foreground: "8fa1b3",
      token: "punctuation.definition.entity"
    },
    {
      foreground: "b48ead",
      token: "meta.selector"
    },
    {
      foreground: "d08770",
      token: "none"
    },
    {
      foreground: "8fa1b3",
      token: "markup.heading punctuation.definition.heading"
    },
    {
      foreground: "8fa1b3",
      token: "entity.name.section"
    },
    {
      foreground: "d08770",
      token: "keyword.other.unit"
    },
    {
      foreground: "ebcb8b",
      fontStyle: "bold",
      token: "markup.bold"
    },
    {
      foreground: "ebcb8b",
      fontStyle: "bold",
      token: "punctuation.definition.bold"
    },
    {
      foreground: "b48ead",
      fontStyle: "italic",
      token: "markup.italic"
    },
    {
      foreground: "b48ead",
      fontStyle: "italic",
      token: "punctuation.definition.italic"
    },
    {
      foreground: "a3be8c",
      token: "markup.raw.inline"
    },
    {
      foreground: "bf616a",
      token: "string.other.link"
    },
    {
      foreground: "d08770",
      token: "meta.link"
    },
    {
      foreground: "d08770",
      token: "meta.image"
    },
    {
      foreground: "bf616a",
      token: "markup.list"
    },
    {
      foreground: "d08770",
      token: "markup.quote"
    },
    {
      foreground: "c0c5ce",
      background: "4f5b66",
      token: "meta.separator"
    },
    {
      foreground: "a3be8c",
      token: "markup.inserted"
    },
    {
      foreground: "a3be8c",
      token: "markup.inserted.git_gutter"
    },
    {
      foreground: "bf616a",
      token: "markup.deleted"
    },
    {
      foreground: "bf616a",
      token: "markup.deleted.git_gutter"
    },
    {
      foreground: "b48ead",
      token: "markup.changed"
    },
    {
      foreground: "b48ead",
      token: "markup.changed.git_gutter"
    },
    {
      foreground: "4f5b66",
      token: "markup.ignored"
    },
    {
      foreground: "4f5b66",
      token: "markup.ignored.git_gutter"
    },
    {
      foreground: "4f5b66",
      token: "markup.untracked"
    },
    {
      foreground: "4f5b66",
      token: "markup.untracked.git_gutter"
    },
    {
      foreground: "96b5b4",
      token: "constant.other.color"
    },
    {
      foreground: "96b5b4",
      token: "string.regexp"
    },
    {
      foreground: "96b5b4",
      token: "constant.character.escape"
    },
    {
      foreground: "ab7967",
      token: "punctuation.section.embedded"
    },
    {
      foreground: "ab7967",
      token: "variable.interpolation"
    },
    {
      foreground: "2b303b",
      background: "bf616a",
      token: "invalid.illegal"
    },
    {
      foreground: "f92672",
      token: "markup.deleted.git_gutter"
    },
    {
      foreground: "a6e22e",
      token: "markup.inserted.git_gutter"
    },
    {
      foreground: "967efb",
      token: "markup.changed.git_gutter"
    },
    {
      foreground: "565656",
      token: "markup.ignored.git_gutter"
    },
    {
      foreground: "565656",
      token: "markup.untracked.git_gutter"
    }
  ],
  colors: {
    "editor.foreground": "#c0c5ce",
    "editor.background": "#2b303b",
    "editor.selectionBackground": "#4f5b66",
    "editor.lineHighlightBackground": "#65737e30",
    "editorCursor.foreground": "#c0c5ce",
    "editorWhitespace.foreground": "#65737e",
    "editorIndentGuide.background": "#3b5364",
    "editorIndentGuide.activeBackground": "#96b5b4"
  }
};
