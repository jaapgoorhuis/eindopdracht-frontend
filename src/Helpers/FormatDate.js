function formatDate(timestamp) {

    console.log(timestamp);

    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();

    return ( hours + ':'+ minutes.substr(-2) );

}

export default formatDate;