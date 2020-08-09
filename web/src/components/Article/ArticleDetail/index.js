import React from 'react';
import 'braft-editor/dist/output.css';

const ArticleDetail = ({ value }) => {
	return <div dangerouslySetInnerHTML={{ __html: value }}></div>;
};

export default ArticleDetail;
