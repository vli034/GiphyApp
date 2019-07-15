
const app = {}; // app object
app.key = 'mKKDAE6V27NrKf6H4az4dw5YZtNbpcyb'; // API key to retrieve giphy images 
app.displayGifs=(data)=>{ // method of the app object to display the gifs
    
    // using a for loop to iterate through the array of "giphs" we recieve 
    data.forEach(data => {
        const gifHtml = `
            <div class="gif-box">
                <div class="img-box">
            <img src="${data.images.original_still.url}" alt="">
            </div>
            <p class="gif-title">${data.title}</p>
            </div>`
        $('.results').append(gifHtml); // append to html 
    });


};
app.getGifs = (userInput) => { // another app method that takes in user input 
    $.ajax({
        url:"https://api.giphy.com/v1/gifs/search", //AJAX calls to get ovject 
        method:"GET",
        dataType:"json",
        data:{ // bc we are calling the api to retrieve the data we are getting requires two parameters we are adding it here 
            api_key: app.key,
            q: userInput // refer to the api documentation for proper parameters 
        }
    }).then(res => { // res refers to result 
        const gifArray = res.data; // get the data which is an array object 
        // once we have gifs display giphs display it to the page  aka call that mutherfucking function 
        app.displayGifs(gifArray); 
    });

};
// when your app initialize do this...
app.init = () =>{
    // call get gifs -- which ulimately gets the gif via AJAX call
    app.getGifs();
    // then calls the function displayGifs which tells it to iterate through the array object, retrieve only the lionk and append to html
    $('form').on('submit', function(e){
        e.preventDefault();
        $(`.results`).empty(); // empty field  after you click submit to load other resultd
        const userInput =$(`input[type="text"]`).val();
        app.getGifs(userInput);// passing the user input in the method of get GIFS
    });
};

// when document ready call app.init

$(()=>{
    app.init(); 
    
});