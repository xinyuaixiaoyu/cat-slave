import React from 'react';
import './index.less';

const ArticleSearch = ({ value = [], onChange = () => {} }) => {
	return (
		<div styleName="container">
			<div styleName="item" onClick={() => onChange({})}>
				Reset
			</div>
			{value.map((item) => {
				return (
					<div
						key={item.categoryId}
						styleName="item"
						onClick={() => onChange({ categoryId: item.categoryId })}
					>
						{item.name}
					</div>
				);
			})}
		</div>
	);
};

export default ArticleSearch;
