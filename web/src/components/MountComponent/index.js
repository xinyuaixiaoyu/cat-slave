import ReactDom from 'react-dom';

export const MountComponent = (component, id = '_wrapComponent_') => {
	const current = document.getElementById(id);
	if (current) {
		document.body.removeChild(current);
	}
	const _wrapComponent_ = document.createElement('div');
	_wrapComponent_.id = id;
	document.body.appendChild(_wrapComponent_);
	ReactDom.render(component, document.getElementById(id));
};
