import React from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

const Editor = ({ onChange, value }) => {
	return (
		<div style={{ border: '1px solid #d9d9d9' }}>
			<BraftEditor value={value} onChange={onChange} />
		</div>
	);
};

export default Editor;
