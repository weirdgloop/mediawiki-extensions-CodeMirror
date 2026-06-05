const { lessLanguage } = require( '../lib/codemirror.bundle.modes.js' );
const CodeMirrorMode = require( './codemirror.mode.js' );

/**
 * LESS language support for CodeMirror.
 *
 * @example
 * const require = await mw.loader.using( [ 'ext.CodeMirror', 'ext.CodeMirror.modes' ] );
 * const CodeMirror = require( 'ext.CodeMirror' );
 * const { less } = require( 'ext.CodeMirror.modes' );
 * const cm = new CodeMirror( myTextarea, less() );
 * cm.initialize();
 * @extends CodeMirrorMode
 * @hideconstructor
 */
class CodeMirrorLess extends CodeMirrorMode {

	/** @inheritDoc */
	get language() {
		return lessLanguage;
	}

	/** @inheritDoc */
	get lintSource() {
		return undefined;
	}

	/** @inheritDoc */
	get hasWorker() {
		return false;
	}
}

module.exports = CodeMirrorLess;