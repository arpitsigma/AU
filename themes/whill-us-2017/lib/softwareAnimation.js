(function() {

	/* global tinymce */
	tinymce.PluginManager.add('softwareAnimation', function( editor ) {
		console.log("loaded!!!!!");
		function replaceGalleryShortcodes( content ) {
			console.log('BeforeSetContent!');
			return content.replace( /\[software-animation\]/g, function() {
				return html( 'software-animation' );
			});
		}

		function html() {
			return '<div data-software-animation class="software-animation p-iphone">&nbsp;</div>';
		}

		function restoreMediaShortcodes( content ) {
			console.log(content);

			return content.replace( /(?:<div( [^>]+)?>)\s*(?:<\/div>)/g, function( match, attr ) {
				console.log(match)
				console.log(attr)

				if ( typeof attr != 'undefined' && attr.indexOf('data-software-animation') > -1 ) {
					return '[software-animation]';
				}

				return match;
			});
		}

		editor.on( 'BeforeSetContent', function( event ) {
			event.content = replaceGalleryShortcodes( event.content );
		});

		editor.on( 'PostProcess', function( event ) {
			if ( event.get ) {
				event.content = restoreMediaShortcodes( event.content );
			}
		});
	});

})();