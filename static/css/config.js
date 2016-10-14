/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	config.toolbarGroups = [
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'insert', groups: [ 'insert' ] },

	];
	config.filebrowserImageUploadUrl = '/pic_pre/';
	config.removeButtons = 'About,Maximize,ShowBlocks,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Anchor,Unlink,Link,BidiLtr,BidiRtl,Language,JustifyRight,JustifyBlock,JustifyCenter,JustifyLeft,Blockquote,CreateDiv,Indent,Outdent,NumberedList,BulletedList,RemoveFormat,Strike,Subscript,Superscript,Scayt,SelectAll,Find,Undo,Cut,Templates,Save,NewPage,Preview,Print,Copy,Paste,PasteText,PasteFromWord,Redo,Replace,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField';
};
