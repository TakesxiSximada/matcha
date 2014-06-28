var MatchaLoader = (function () {
    function MatchaLoader(){
    };

    MatchaLoader.prototype.get_json = function () {
        $.ajax({
            url: '/api/messages.json',
            dataType: 'json',
            type: 'GET',
            success: function (datas, textStatus, xhr){
                datas.forEach(function (data){
	                addMessageMarker(data.id, data.lat, data.lng, data.message);
                });

                // alert(data); // need modify
            }
            // error: function (){
	        //     addMessageMarker(1, -34.397, 150.144, message="ここのお店いいよ"); // TODO this will be called upon server call, not here
	        //     addMessageMarker(2, -34.497, 150.245, message="だるい"); // TODO this will be called upon server call, not here
	        //     addMessageMarker(3, -34.399, 150.246, message="明日学校かー"); // TODO this will be called upon server call, not here
	        //     addMessageMarker(4, -34.391, 150.647, message="誰か連絡してくれ"); // TODO this will be called upon server call, not here
	        //     addMessageMarker(5, -34.392, 150.648, message="仕方がないのでWAを入れる"); // TODO this will be called upon server call, not here
            // }
        });
    };
    return MatchaLoader;
})();

function matcha_loader_run(){
    var loader = new MatchaLoader();
    loader.get_json();
    // window.setTimeout(matcha_loader_run, 1000); // 定期的に実行はとりあえずしない
}
