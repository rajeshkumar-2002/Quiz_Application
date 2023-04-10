import React, { useState } from "react";
import AceEditor from "react-ace";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";

// theme
import "brace/theme/monokai";
import "brace/theme/github";
import "brace/theme/tomorrow";
import "brace/theme/kuroir";
import "brace/theme/twilight";
import "brace/theme/xcode";
import "brace/theme/textmate";
import "brace/theme/solarized_dark";
import "brace/theme/solarized_light";
import "brace/theme/terminal";

// language
import "brace/mode/html";
import "brace/mode/css";
import "brace/mode/javascript";
import "brace/ext/language_tools";

const Playground = () => {
  const [language, setLanguage] = useState("html");
  const [theme, setTheme] = useState("monokai");
  const [code_Size, setSize] = useState("14");

  const [code, setCode] = useState({
    html: "",
    css: "",
    javascript: "",
  });

  const handleCodeChange = (newValue, type) => {
    setCode({
      ...code,
      [type]: newValue,
    });
  };
  const renderPreview = () => {
    const combinedCode = `
    <html>
      <head>
        <style>${code.css}
          body::-webkit-scrollbar {
            display: none;
          }
          body {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        </style>
      </head>
      <body style="display: flex; justify-content: center; align-items: center; height: 100vh;">${code.html}</body>
      <script>${code.js}</script>
    </html>
  `;
    return (
      <iframe
        title="Output"
        srcDoc={combinedCode}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
        }}
      />
    );
  };

  const onLanguagechange = (e) => {
    setLanguage(e);
  };
  const onThemeChange = (e) => {
    setTheme(e.target.value);
  };
  const onFontSizeChange = (e) => {
    setSize(parseInt(e.target.value));
  };

  return (
    <div className="container">
      <h1 className="fs-3 text-center py-3">Playground</h1>
      <div
        className="d-flex flex-wrap justify-content-between"
        style={{ width: "100%", height: "100%", backgroundColor: "blue" }}
      >
        <div className="order-2 order-md-1" style={{ minWidth: "50%" }}>
          <div className="d-flex justify-content-between col-xxl-5 col-xl-6 col-lg-7 col-md-9 col-12 flex-wrap mb-3">
            <select
              style={{ borderRadius: "9px" }}
              className="custom-dropdown"
              name="Font Size"
              onChange={(e) => {
                onLanguagechange(e.target.value);
              }}
            >
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="javascript">JS</option>
            </select>
            <select
              style={{ borderRadius: "9px" }}
              className="custom-dropdown"
              name="Theme"
              onChange={(e) => {
                onThemeChange(e);
              }}
            >
              <option value="monokai">monokai</option>
              <option value="github">github</option>
              <option value="tomorrow">tomorrow</option>
              <option value="kuroir">kuroir</option>
              <option value="twilight">twilight</option>
              <option value="xcode">xcode</option>
              <option value="textmate">textmate</option>
              <option value="solarized_dark">solarized_dark</option>
              <option value="solarized_light">solarized_light</option>
              <option value="terminal">terminal</option>
            </select>
            <select
              style={{ borderRadius: "9px" }}
              className="custom-dropdown"
              name="Font Size"
              onChange={(e) => {
                onFontSizeChange(e);
              }}
            >
              <option value="14">14</option>
              <option value="16">16</option>
              <option value="18">18</option>
              <option value="20">20</option>
              <option value="24">24</option>
              <option value="28">28</option>
              <option value="32">32</option>
              <option value="40">40</option>
            </select>
          </div>
          <AceEditor
            placeholder=""
            mode={language}
            theme={theme}
            value={code[language]}
            name="blah2"
            onChange={(newValue) => handleCodeChange(newValue, language)}
            fontSize={code_Size}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
            width="100%"
          />
        </div>
        <div
          className="order-1 order-md-2"
          style={{ minWidth: "50%", minHeight: "300px" }}
        >
          <div style={{ width: "100%", height: "100%" }}>{renderPreview()}</div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
