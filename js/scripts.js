$(document).ready(function() {
    // Mapping object to map each page to corresponding CSS and JavaScript files
    const pageResourceMapping = {
        'home.html': {
            css: ['css/style_home.css'],
            js: ['']
        },
        'resume.html': {
            css: ['css/style_resume.css'],
            js: ['js/resume_pdfobject.js']
        },
        'experience.html': {
            css: ['css/style_experience.css'],
            js: []
        },
        'research.html': {
            css: ['css/style_research.css'],
            js: []
        },
        'skills.html': {
            css: ['css/style_skills.css'],
            js: []
        },
        'portfolio.html': {
            css: ['css/style_portfolio.css'],
            js: []
        },
        'contact.html': {
            css: ['css/style_contact.css'],
            js: []
        }
        // Add other pages and their corresponding CSS and JavaScript files here
    };

    // Automatically load home.html when the page is loaded
    loadPage('./pages/home.html');

    // Load different pages when navigation buttons are clicked
    $('.load-page').on('click', function(e) {
        e.preventDefault();
        var page = $(this).data('page'); // Get the page from the data attribute
        loadPage('./pages/' + page);
    });

    // Function to dynamically load pages using jQuery's ajax method
    function loadPage(page) {
        $('#loader').show(); // Show the loader
        $.ajax({
            url: page,
            method: 'GET',
            success: function(data) {
                // Remove previously loaded CSS and JavaScript files
                removePreviousResources();

                // Load specific CSS and JavaScript for this page based on the mapping
                loadMappedResources(page);

                $('#dynamic-content').html(data); // Inject the loaded content
                $('#loader').hide(); // Hide the loader after content is loaded
            },
            error: function() {
                $('#dynamic-content').html('<p>Sorry, unable to load content.</p>');
                $('#loader').hide(); // Hide the loader in case of error
            }
        });
    }

    // Function to remove previously loaded CSS and JavaScript files
    function removePreviousResources() {
        // Remove CSS files that have the data attribute 'dynamic-resource'
        $('link[data-dynamic-resource="true"]').remove();

        // Remove JavaScript files that have the data attribute 'dynamic-resource'
        $('script[data-dynamic-resource="true"]').each(function() {
            // Remove the script tag
            $(this).remove();
        });
    }

    // Function to load mapped CSS and JavaScript files based on the current page
    function loadMappedResources(page) {
        // Extract the page name from the path
        var pageName = page.split('/').pop();

        // Check if the page has mapped resources (CSS and JS files)
        if (pageResourceMapping.hasOwnProperty(pageName)) {
            const resources = pageResourceMapping[pageName];

            // Load all mapped CSS files for the page
            if (resources.css) {
                resources.css.forEach(function(cssFile) {
                    // Check if the CSS file is already included
                    if (!$('link[href="' + cssFile + '"]').length) {
                        // If not included, add the link tag to the head
                        $('<link>', {
                            rel: 'stylesheet',
                            href: cssFile,
                            'data-dynamic-resource': 'true' // Add attribute to identify it for future removal
                        }).appendTo('head');
                    }
                });
            }

            // Load all mapped JavaScript files for the page
            if (resources.js) {
                resources.js.forEach(function(jsFile) {
                    // Check if the JavaScript file is already included
                    if (!$('script[src="' + jsFile + '"]').length) {
                        // If not included, dynamically load the JavaScript file
                        $.getScript(jsFile).done(function(script, textStatus) {
                            // Optionally: add attribute to identify it for future removal
                            $('script[src="' + jsFile + '"]').attr('data-dynamic-resource', 'true');
                        });
                    }
                });
            }
        }
    }
});