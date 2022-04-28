function CalculateWind(resultParam) {
    if(resultParam > 1 && resultParam < 5) {
        return ('1');
    }
    else if(resultParam > 5 && resultParam < 11) {
        return('2');
    }
    else if(resultParam > 11 && resultParam <19) {
        return('3');
    }
    else if(resultParam > 19 && resultParam <28) {
        return('4');
    }
    else if(resultParam > 28 && resultParam <38) {
        return(5);
    }
    else if(resultParam > 38 && resultParam <49) {
        return(6);
    }
    else if(resultParam > 49 && resultParam <61) {
        return(7);
    }
    else if(resultParam > 61 && resultParam <74) {
        return(8);
    }
    else if(resultParam > 74 && resultParam <88) {
        return(9);
    }
    else if(resultParam > 88 && resultParam <102) {
        return(10);
    }
    else if(resultParam > 102 && resultParam <117) {
        return(11);
    }
    else if(resultParam > 117) {
        return(12);
    }
}

export default CalculateWind;
