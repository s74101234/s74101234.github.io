// Portfolio Image Modal
$(document).on('click', '.portfolio-thumb', function () {
    var imgSrc = $(this).attr('src');
    var imgAlt = $(this).attr('alt') || '';
    var modalHtml = `
        <div class="portfolio-img-modal-overlay" style="position:fixed;z-index:9999;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;animation:fadeIn 0.2s;">
            <div style="position:relative;max-width:90vw;max-height:90vh;animation:zoomIn 0.25s;">
                <img src="${imgSrc}" alt="${imgAlt}" style="max-width:90vw;max-height:90vh;box-shadow:0 8px 40px rgba(0,0,0,0.7);border-radius:18px;">
                <button class="portfolio-img-modal-close" style="position:absolute;top:-18px;right:-18px;background:rgba(255,255,255,0.95);border:none;border-radius:50%;width:40px;height:40px;font-size:22px;line-height:40px;cursor:pointer;box-shadow:0 2px 12px rgba(0,0,0,0.18);display:flex;align-items:center;justify-content:center;transition:background 0.2s,transform 0.2s;">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="6" y1="6" x2="16" y2="16" stroke="#333" stroke-width="2.5" stroke-linecap="round"/>
                        <line x1="16" y1="6" x2="6" y2="16" stroke="#333" stroke-width="2.5" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
        </div>
        <style>
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoomIn { from { transform: scale(0.92); opacity: 0.7; } to { transform: scale(1); opacity: 1; } }
        .portfolio-img-modal-close:hover {
            background: #ff5252 !important;
            transform: scale(1.12) rotate(8deg);
        }
        .portfolio-img-modal-close svg line { stroke: #333; transition: stroke 0.2s; }
        .portfolio-img-modal-close:hover svg line { stroke: #fff; }
        </style>
    `;
    $('body').append(modalHtml);
});


// Overlay click closes modal, but not when clicking the image or modal content
$(document).on('click', '.portfolio-img-modal-overlay', function (e) {
    if (e.target === this) {
        $('.portfolio-img-modal-overlay').remove();
    }
});

// Close button click closes modal (works even if SVG or child is clicked)
$(document).on('click', '.portfolio-img-modal-close', function (e) {
    e.stopPropagation();
    $('.portfolio-img-modal-overlay').remove();
});
