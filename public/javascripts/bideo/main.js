(function () {
    var bv = new Bideo();
    bv.init({
        // Video element
        videoEl: document.querySelector('#background_video'),

        // Container element
        container: document.querySelector('body'),

        // Resize
        resize: true,

        // Array of objects containing the src and type
        // of different video formats to add
        src: [
            {
                src: 'images/index/pharah-1.mp4',
                type: 'video/mp4'
            },
            {
                src: 'images/index/pharah-2.mp4',
                type: 'video/mp4'
            },
            {
                src: 'images/index/pharah-3.mp4',
                type: 'video/mp4'
            }
        ],

        // What to do once video loads (initial frame)
        onLoad: function () {
            document.querySelector('#video_cover').style.display = 'none';
        }
    });
}());