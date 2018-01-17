$( document ).ready(function() {

    var c = $("canvas")[0];
    var click = false;

    var canvas = c.getContext("2d");
    var rubber = $("#rubber");
    var line = $("#line");
    var rect = $("#rect");
    var arc = $("#arc");
    var pen = $("#pen");
    var reset = $("#reset");
    var full = $("#full");
    var dl =$("#download");


    var offsetX = $("canvas").offset().left;
    var offsetY = $("canvas").offset().top;

    var nbClick = 0;

    var y = "";
    var x = "";

    var prevY = -1;
    var prevX = -1;

    $(window).mousedown(function(){
        click = true;
    });

    $(window).mouseup(function(){
        click = false;
    });

    $("canvas").mousedown(function(e){
        if(click === true && (pen.is(":checked") || rubber.is(":checked"))) {
            draw(e.pageX, e.pageY);
        }
    });

    $("canvas").mouseup(function(e){
        draw(e.pageX, e.pageY);

    });

    $("canvas").mousemove(function(e){
        if(click === true && (pen.is(":checked") || rubber.is(":checked"))) {
            draw(e.pageX, e.pageY);
        }
    });

    //reset du nombre de click quand on change d"outils
    $("input[type=radio][name=tools]").change(function() {
        nbClick = 0;
    });


    //DL Button
    $(dl).click(function(){
        var link = document.createElement("a");
        link.href = c.toDataURL();
        link.download = "paint.png";
        dl.attr(link);  
    });


// globalCompositeOperation = type;
function draw(x, y){


    if ($(rubber).is(":checked")) {
        //gomme

        canvas.beginPath();
        canvas.globalCompositeOperation = "destination-out";
        canvas.arc(x - offsetX, y - offsetY, $("input[type=range]").val(), 0, 2 * Math.PI);
        canvas.fill();
        canvas.closePath();
        canvas.globalCompositeOperation = "source-over";
    }
    if ($(line).is(":checked")) {
        nbClick++;
        if(nbClick % 2){ // POINT A
            canvas.beginPath();
            canvas.moveTo(x - $("canvas").offset().left, y - $("canvas").offset().top);
            
        }
        else { // POINT B
            canvas.lineWidth = $("input[type=range]").val();
            canvas.strokeStyle = $("input[type=color]").val();
            canvas.lineTo(x - $("canvas").offset().left, y - $("canvas").offset().top);
            canvas.stroke();
            canvas.closePath();
        }
    }
    if ($(pen).is(":checked")){
        canvas.beginPath();
        canvas.globalCompositeOperation = "source-over";
        canvas.fillStyle = $("input[type=color]").val();
        canvas.arc(x - $("canvas").offset().left, y - $("canvas").offset().top, $("input[type=range]").val(), 0, 2 * Math.PI);
        canvas.fill();
        canvas.closePath();
    }

    if ($(rect).is(":checked")) {
        nbClick++;
        if(nbClick % 2){
            prevX = x;
            prevY = y;
        }
        else{
            canvas.beginPath();
            canvas.lineWidth = $("input[type=range]").val();
            canvas.strokeStyle = $("input[type=color]").val();
            canvas.fillStyle = $("input[type=color]").val();
            canvas.rect(prevX - offsetX ,prevY - offsetY,(x - offsetX)-(prevX - offsetX),(y - offsetY)-(prevY - offsetY));
            fill(),         
            canvas.closePath();
        }
    }

    if (arc.is(":checked")) {

        nbClick++;
        if(nbClick % 2){
            prevX = x;
            prevY = y;
        }
        else{
            canvas.beginPath();
            canvas.lineWidth = $("input[type=range]").val(); 
            canvas.strokeStyle = $("input[type=color]").val();
            canvas.fillStyle = $("input[type=color]").val();
            canvas.arc(prevX - offsetX, prevY - offsetY, Math.sqrt(Math.pow(x - prevX, 2) + Math.pow(y - prevY, 2)), 0, 2 * Math.PI);
            fill();
            canvas.closePath();
        }
    }   
}

$(reset).click(function(){
    canvas.clearRect(0, 0, c.width, c.height);
});

//defini le style de remplissage
function fill (){
    if (full.is(":checked")) {
        return canvas.fill();
    }
    else{
        return canvas.stroke();
    }
}

})