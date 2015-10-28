var require = {  
    paths: {
        // 이 설정으로 모듈 이름을 호출하면 값의 위치를 요청한다.
        // ".js"는 자동 추가
        'jquery': 'http://code.jquery.com/jquery-1.10.2',
        'modernizr': 'http://modernizr.com/downloads/modernizr-latest',
        'jindo': '/js/lib/jindo_component'
    },
    shim: {
        'modernizr': { 
            // Modernizr는 전역변수 "Modernizr"를 사용한다. 
            exports: 'Modernizr' 
        }
        'jindo': {
            deps: ['/js/lib/jindo.desktop.all.ns'],
            // Jindo(네임스페이스 버전)는 전역변수 "jindo"를 사용한다.
            exports: 'jindo' 
        }
    }
};

// 사용
require([  
    'jquery',
    'modernizr',
    'jindo'
], function (jquery, modernizr, jindo) {
    console.log(jquery); // (1) jQuery    
    console.log(modernizr); // (2) Modernizr
    console.log(jindo); // (3) Jindo
});
