document.addEventListener('DOMContentLoaded', function () {

    CoreUI.breadcrumb.create({
        items: [
            { text: 'Home', url: '#' },
            { text: 'Library', url: '#' },
            { text: 'Data' },
        ]
    }).render('breadcrumb-simple');


    CoreUI.breadcrumb.create({
        divider: '&gt;',
        items: [
            { text: 'Home', url: '#' },
            { text: 'Library', url: '#' },
            { text: 'Data' },
        ]
    }).render('breadcrumb-divider');


    CoreUI.breadcrumb.create({
        divider: 'url(&#34;data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'8\' height=\'8\'%3E%3Cpath d=\'M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z\' fill=\'%236c757d\'/%3E%3C/svg%3E&#34;)',
        items: [
            { text: 'Home', url: '#' },
            { text: 'Library', url: '#' },
            { text: 'Data' },
        ]
    }).render('breadcrumb-divider-svg');


    // Code highlight
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
});