const { syntaxTree } = require( 'ext.CodeMirror.lib' );
const { lessLanguage, lessCompletionSource } = require( '../lib/codemirror.bundle.modes.js' );
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

	/** @inheritDoc */
	get support() {
		return lessLanguage.data.of( {
			autocomplete: ( context ) => {
				const { state, pos: p } = context,
					node = syntaxTree( state ).resolveInner( p, -1 ),
					result = lessCompletionSource( context );
				if ( result && node.name === 'ValueName' ) {
					const options = [ { label: 'revert', type: 'keyword' }, ...result.options ];
					let { prevSibling } = node;
					while ( prevSibling && prevSibling.name !== 'PropertyName' ) {
						( { prevSibling } = prevSibling );
					}
					if ( prevSibling ) {
						for ( let i = 0; i < options.length; i++ ) {
							const option = options[ i ];
							if ( CSS.supports(
								state.sliceDoc( prevSibling.from, node.from ) + option.label
							) ) {
								options.splice( i, 1, Object.assign( {}, option, {
									boost: 50
								} ) );
							}
						}
					}
					result.options = options;
				}
				return result;
			}
		} );
	}
}

module.exports = CodeMirrorLess;