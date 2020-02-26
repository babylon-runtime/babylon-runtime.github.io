jQuery(document).ready(function($) {
    // Right menu on pages
    var $list = $('#sidebar-right');
    var buffer = "";
    $("#main section").find("h1, h2, h3, h4").each(function(title, element){
        var $element = $(element);
        buffer += '<li><a href="#'+ $element.attr('id') +'" class="'+ $element.prop('tagName') +'">'+ $element.html() +'</a></li>';
    });
    $list.prepend(buffer);
    UIkit.scrollspy($list[0]);
    // Babylon links
    $('a[href^="https://doc.babylonjs.com"]').each(function(index, element) {
        $(element).attr('target', '_blank');
        $(element).addClass("babylon-link");
        var innerHtml = $(element).html();
        innerHtml += ' <img src="/assets/babylon.ico">';
        $(element).html(innerHtml);
    })

});