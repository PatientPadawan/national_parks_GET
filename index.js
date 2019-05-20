'use strict';

const apiKey = 'SNQdW7wbZqJwHEU2bbR4fstiDvCaP2sv9LaacyE3';

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();

    for (let i=0; i < responseJson.data.length; i++) {
        $('#results-list').append(
            `<li><h3>${responseJson.data[i].name}</h3>
            <p>${responseJson.data[i].description}</p>
            <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>`
        )
    };

    $('#results').removeClass('hidden');
}

function getParksInfo(searchTerm, maxResults) {
    const url = `https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&stateCode=${searchTerm}&limit=${maxResults}`;

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('broken');
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`That didn't work! Make sure to enter the correct
        state abbreviations seperated by commas without spaces.`);
        $('#results-list').empty();
    });
}

function queryFix(searchTerm, maxResults) {
    // since json response starts at 0
    maxResults = maxResults - 1;
    getParksInfo(searchTerm, maxResults);
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const maxResults = $('#js-max-results').val();
        const searchTerm = $('#js-search-term').val();
        queryFix(searchTerm, maxResults);
    });
}

$(function() {
    console.log('App loaded! Ready to search!');
    watchForm();
});