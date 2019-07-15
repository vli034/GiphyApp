
const app = {}; // app object
app.key = 'mKKDAE6V27NrKf6H4az4dw5YZtNbpcyb';
app.displayGifs=(data)=>{
    // console.log(data);
    // for(let i=0; i<data.length; i++){
    //     console.log(data.images.original_still.url[i]);
      
    // };


    data.forEach(data => {
        // console.log(data.images.original_still.url);
        const gifHtml = `
            <div class="gif-box">
                <div class="img-box">
            <img src="${data.images.original_still.url}" alt="">
            </div>
            <p class="gif-title">${data.title}</p>
            </div>`
        $('.results').append(gifHtml);
    });


};
app.getGifs = (userInput) => {

    $.ajax({
        url:"https://api.giphy.com/v1/gifs/search",
        method:"GET",
        dataType:"json",
        data:{ // bc we are calling the api to retrieve the data we are getting requires two paramters we are adding it here 
            api_key: app.key,
            q: userInput
        }
    }).then(res => {
        // console.log("the result of get gifs",res.data);
        const gifArray = res.data; // passing the data which is an array object 
        // once we have gifs display gits to page 
        app.displayGifs(gifArray);
    });

}
app.init = () =>{
    app.getGifs();
    
    $('form').on('submit', function(e){
        e.preventDefault();
        $(`.results`).empty(); // empty field  after you click submit to load other resultd
        const userInput =$(`input[type="text"]`).val();
        app.getGifs(userInput);
      

    });


};

$(()=>{
    app.init(); // call .init() in document.ready() 

    //make api call 
    //get input from value from user 
    // spit data back out on page 


    
});