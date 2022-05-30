Object.defineProperty(exports, "__esModule",
{
	value: true
});
var _createIconComponent = require('./utils/createIconComponent');
var _createIconComponent2 = _interopRequireDefault(_createIconComponent);
var _react = require('react');
var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj)
{
	return obj && obj.__esModule ? obj :
	{
		default: obj
	};
}
var IconAddOutline = (0, _createIconComponent2.default)(
{
	content: _react2.default.createElement('g', null, _react2.default.createElement('path',
	{
		d: 'M0,22C0,9.8,9.8,0,22,0c20,0,38,22,38,22S40.5,44,22,44C9.8,44,0,34.2,0,22z'
	})),
	height: 44,
	width: 60
});
IconAddOutline.displayName = 'IconAddOutline';
exports.default = IconAddOutline;
