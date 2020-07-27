/* eslint-disable react/no-string-refs */
import React from 'react';
import E from 'wangeditor';

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const editor = new E(this.refs.editorEleme);
    editor.customConfig.onchange = (html) => {
      this.props.setEditor(html);
    };
    editor.customConfig.uploadImgShowBase64 = true;
    editor.create();
  }

  render() {
    return <div ref="editorEleme"></div>;
  }
}

export default Editor;
