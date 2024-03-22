// document.addEventListener('DOMContentLoaded', function() {
//     const textContent = document.body.innerText;
//     chrome.runtime.sendMessage({ type: "webpageContent", content: textContent });
// });
// console.log(document.body.innerText)


// window.onload = (event) => {
//     console.log("page is fully loaded");
//     chrome.runtime.sendMessage({ type: "webpageContent", content: document.body.innerText });
//     console.log("hello here");
    
//     let btn = document.getElementById("my-button");
//     // btn.onclick = ()eve
//     setTimeout(() => {
//         chrome.runtime.sendMessage({ type: "webpageContent", content: document.body.innerText });
//         console.log("hello here2");
//     }, 5000);
// };

// setTimeout(() => {
//         console.log("hello 1");
//         chrome.runtime.sendMessage({ type: "webpageContent", content: document.body.innerText });
//         console.log("hello here2");
//     }, 5000);


// var timer = 0;
// var si = setInterval(() => {
//           try {
//              chrome.runtime.sendMessage({ type: "webpageContent", content: document.body.innerText });
//               timer++;
//               if (timer === 5) {
//                   clearInterval(si);
//               }
//           } catch (error) {
//               // debugger;
//               console.log(error);
//           }
//       }, 2000);

// Get the text content of the page
const webpageContent = document.body.innerText;

// Store the webpage content in chrome.storage
chrome.storage.local.set({ webpageContent }, () => {
    console.log("Webpage content stored in chrome.storage");
});


// window.onload = (event) => {
//     console.log("page is fully loaded");

//     // Send the message to the background script
//     chrome.runtime.sendMessage({ type: "webpageContent", content: document.body.innerText });

//     // Define a function to send the message after 5 seconds
//     const sendDelayedMessage = () => {
//         console.log("Sending delayed message");
//         chrome.runtime.sendMessage({ type: "webpageContent", content: document.body.innerText });
//     };

//     // Call the function after a delay of 5 seconds
//     //setTimeout(sendDelayedMessage, 5000);
// };