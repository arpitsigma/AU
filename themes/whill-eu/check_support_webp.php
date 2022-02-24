
<script type="text/javascript">
    function checkSupport() {
        let html = document.documentElement,
            WebP = new Image();

        WebP.onload = WebP.onerror = function() {
            let isSupported = (WebP.height === 2);

            if (isSupported) {
                if (html.className.indexOf('no-webp') >= 0){
                    html.className = html.className.replace(/\bno-webp\b/, 'webp');
                }
                else {
                    html.className += ' webp';
                }
            }
            console.log('webp --- '+isSupported);
        };
        WebP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }
    checkSupport();
</script>
