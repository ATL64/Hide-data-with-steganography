function clearbits(colorval){
    var x = Math.floor(colorval/16)*16;
    return x;
}

function chop2hide(image){
    for (var px of image.values()){
        px.setRed(clearbits(px.getRed()));
        px.setGreen(clearbits(px.getGreen()));
        px.setBlue(clearbits(px.getBlue()));
    }
    return image;
}

function shift(image){
    for(var px of image.values()){
        px.setRed(px.getRed()/16);
        px.setGreen(px.getGreen()/16);
        px.setBlue(px.getBlue()/16);
    }
    return image;
}

function combine(show,hide){
    var answer =
}
