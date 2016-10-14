/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	//config.toolbarGroups = [
		//{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		//{ name: 'colors', groups: [ 'colors' ] },
		//{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		//{ name: 'insert', groups: [ 'insert' ] },
		//{ name: 'size', groups: [ 'size' ] },


	//];
	config.height = 350;
	config.language = 'zh-cn';
	config.fontSize='16px;17px18px'+ config.fontSize;
	config.filebrowserImageUploadUrl = '/pic_pre/';
	config.extraPlugins = 'font';
	config.fontSize_defaultLabel = '16px';
	//$(".cke_toolbar_break").hide();
	//config.removeDialogTabs = 'image:advanced';
	config.fontSize_sizes='14/14px;16/16px;18/18px;';
	config.removeButtons = 'Font,Format,Styles,About,ShowBlocks,Source,Flash,Smiley,SpecialChar,PageBreak,Iframe,Anchor,Unlink,Link,BidiLtr,BidiRtl,Language,Blockquote,CreateDiv,Indent,Outdent,NumberedList,BulletedList,RemoveFormat,Strike,Subscript,Superscript,Scayt,SelectAll,Find,Undo,Cut,Templates,Save,NewPage,Preview,Print,Copy,Paste,PasteText,PasteFromWord,Redo,Replace,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField';

};
