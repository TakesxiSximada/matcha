var MatchaLoader = (function () {
    function MatchaLoader(){
    };

    MatchaLoader.prototype.get_json = function () {
        $.ajax({
            url: '/api/messages',
            dataType: 'json',
            type: 'GET',
            success: function (data, textStatus, xhr){
                // alert(data); // need modify
            }
        });
    };
    return MatchaLoader;
})();

function matcha_loader_run(){
    var loader = new MatchaLoader();
    loader.get_json();
    window.setTimeout(matcha_loader_run, 1000);
}
