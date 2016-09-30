requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: './',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        clzz:'./clzz',
        math:'./math/index',
        jquery: 'http://code.jquery.com/jquery-2.2.2.min'
    }
});

require(['math/index', 'jquery'], function(math) {
    var numbers = [500, 1000, 500, 1000];
    var average = math.average(numbers);
    $('#info').append('<p> The average is: '+average+'</p>');
});