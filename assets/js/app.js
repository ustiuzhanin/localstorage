'use strict';

const submitBtn = document.querySelector('.button-primary');
const tweetList = document.querySelector('#tweet-list');
const tweetInput = document.querySelector('#tweet');
const form = document.querySelector('#form');

function createNewTweet() {
    const tweetElement = document.createElement('li');
    const closeTweetElement = document.createElement('a');

    //add tweet

    closeTweetElement.classList.add('remove-tweet');
    closeTweetElement.innerText = 'X';

    tweetElement.innerText = tweetInput.value;

    tweetElement.appendChild(closeTweetElement);
    tweetList.appendChild(tweetElement);

    //remove tweet

    function onCloseBtnClick(evt) {
        tweetList.removeChild(evt.target.parentElement);

    }

    closeTweetElement.addEventListener('click', onCloseBtnClick);
}


function onFormSubmit() {
    if (tweetInput.value !== '') {
        createNewTweet();
    }
}

form.addEventListener('submit', onFormSubmit);