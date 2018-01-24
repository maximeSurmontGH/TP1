function filterInput(){
    document.getElementsByTagName('input')[0].value = document.getElementsByTagName('input')[0].value.toUpperCase();
    var texte = document.getElementsByTagName('input')[0].value;
    var allPossibility = document.getElementsByTagName('a');

    if(texte != ''){
        document.getElementsByTagName('button')[0].className = 'show';

        var score = 0;

        for(let i = 0; i < allPossibility.length; i++){
            if(allPossibility[i].innerHTML.toLowerCase().indexOf(texte.toLowerCase()) > -1){
                allPossibility[i].className = 'show';

                score++;
            }else{
                allPossibility[i].className = 'hide';
            }
        }

        if(score == 0){
            allPossibility[0].className = 'show';
        }
    }else{
        document.getElementsByTagName('button')[0].className = 'hide';
        for(let i = 0; i < allPossibility.length; i++){
            allPossibility[i].className = 'hide';
        }
    }
};

function clearInput(){
    document.getElementsByTagName('input')[0].value = '';
    filterInput();
}

function iPickedYou(index) {
    clearInput();
    document.getElementsByTagName('input')[0].value = document.getElementsByTagName('a')[index].innerHTML;
    switch (index){
        case 1:
            document.getElementById('container').style.background = "url('https://images.alphacoders.com/541/541661.jpg') no-repeat center center fixed";
            document.getElementById('container').style.backgroundSize = "cover";
            break;
        case 2:
            document.getElementById('container').style.background = "url('http://travelhdwallpapers.com/wp-content/uploads/2017/03/Dublin-Wallpaper-2.jpg') no-repeat center center fixed";
            document.getElementById('container').style.backgroundSize = "cover";
            break;
        case 3:
            document.getElementById('container').style.background = "url('https://wallpapercave.com/wp/PuwoAuJ.jpg') no-repeat center center fixed";
            document.getElementById('container').style.backgroundSize = "cover";
            break;
        case 4:
            document.getElementById('container').style.background = "url('https://wallpapercave.com/wp/Z8gw35h.jpg') no-repeat center center fixed";
            document.getElementById('container').style.backgroundSize = "cover";
            break;
        case 5:
            document.getElementById('container').style.background = "url('https://wallpapercave.com/wp/At15L4s.jpg') no-repeat center center fixed";
            document.getElementById('container').style.backgroundSize = "cover";
            break;
        case 6:
            document.getElementById('container').style.background = "url('http://www.hotelcapdiamant.com/wp-content/uploads/2014/04/iStock_000009926119Medium.jpg') no-repeat center center fixed";
            document.getElementById('container').style.backgroundSize = "cover";
            break;
        case 7:
            document.getElementById('container').style.background = "url('http://eskipaper.com/images/tokyo-background-1.jpg') no-repeat center center fixed";
            document.getElementById('container').style.backgroundSize = "cover";
            break;
        default:
            document.getElementById('container').style.background = "radial-gradient(#627696 0%, #222C3A 85%)";
    };
}