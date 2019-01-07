'use strict';

const submitBtn = document.querySelector('.button-primary');
const tweetList = document.querySelector('#tweet-list');
const tweetInput = document.querySelector('#tweet');
const form = document.querySelector('#form');

function onFormSubmit(evt) {
    evt.preventDefault();
    if (tweetInput.value !== '') {
        createNewTweet();
    }
    this.reset();
};

//add tweet

function createNewTweet() {
    const tweetElement = document.createElement('li');
    const closeTweetElement = document.createElement('a');

    closeTweetElement.classList.add('remove-tweet');
    closeTweetElement.innerText = 'X';

    tweetElement.textContent = tweetInput.value;

    tweetElement.appendChild(closeTweetElement);
    tweetList.appendChild(tweetElement);

    // add tweet to local storage

    addTweetToLocalStorage(tweetInput.value);
};

function addTweetToLocalStorage(tweet) {
    let tweetsFromLS = getTweetsFromLocalStorage();

    tweetsFromLS.push(tweetInput.value);

    localStorage.setItem('tweets', JSON.stringify(tweetsFromLS));
};

function getTweetsFromLocalStorage() {
    let tweets;
    const tweetsLS = localStorage.getItem('tweets');

    if (tweetsLS === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(tweetsLS);
    }

    return tweets;
};

// remove tweet

function onCloseBtnClick(evt) {
    const targetParent = evt.target.parentElement;
    if (evt.target.classList.contains('remove-tweet')) {
        tweetList.removeChild(targetParent);
        removeTweetFromLocalStorage(targetParent.textContent);
    }
};

// remove tweet form local storage

function removeTweetFromLocalStorage (tweet) {
    let tweetsLS = getTweetsFromLocalStorage();

    const deleteTweet = tweet.slice(0, -1);

    tweetsLS.some(function(item, index) {
        if (deleteTweet === item) {
            tweetsLS.splice(index, 1);
            return true;
        }
      });

    localStorage.setItem('tweets', JSON.stringify(tweetsLS));
}

// load tweets from local storage

function onPageLoadStorageCheck() {
    let tweetsLS = getTweetsFromLocalStorage();

    tweetsLS.forEach(function (item) {
        const tweetElement = document.createElement('li');
        const closeTweetElement = document.createElement('a');

        closeTweetElement.classList.add('remove-tweet');
        closeTweetElement.innerText = 'X';

        tweetElement.innerText = item;

        tweetElement.appendChild(closeTweetElement);
        tweetList.appendChild(tweetElement);
    });
};

// event listeners

form.addEventListener('submit', onFormSubmit);
tweetList.addEventListener('click', onCloseBtnClick);
document.addEventListener('DOMContentLoaded', onPageLoadStorageCheck);