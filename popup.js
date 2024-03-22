import british from "./hardcodes/british.js";
import arabic from "./hardcodes/arabic.js";
import chinese from "./hardcodes/chinese.js";
import french from "./hardcodes/french.js";
import german from "./hardcodes/german.js";
import indonesian from "./hardcodes/indonesian.js";
import italian from "./hardcodes/italian.js";
import spanish from "./hardcodes/spanish.js";

	
//the next is the AHO-CORASCIK Algorithm

// Max number of states in the matching machine.
// Should be equal to the sum of the length of all keywords.
let MAXS = 0;

// Maximum number of characters in input alphabet
const MAXC = 3000;
let out,f,g;
let outputWords=[];

function buildMatchingMachine(arr, k) {
out.fill(0);

let states = 1;

for (let i = 0; i < k; ++i) {
	const word = arr[i];
	let currentState = 0;

	for (let j = 0; j < word.length; ++j) {
	let ch = word.codePointAt(j) - 'a'.charCodeAt(0);
	//console.log(word);
	if (g[currentState][ch] == -1)
		g[currentState][ch] = states++;

	currentState = g[currentState][ch];
	}

	out[currentState] |= (1 << i);
}

for (let ch = 0; ch < MAXC; ++ch)
	if (g[0][ch] == -1)
	g[0][ch] = 0;

f.fill(-1);

let q = [];

for (let ch = 0; ch < MAXC; ++ch) {
	if (g[0][ch] != 0) {
	f[g[0][ch]] = 0;
	q.push(g[0][ch]);
	}
}

while (q.length) {

	let state = q.shift();

	for (let ch = 0; ch < MAXC; ++ch) {

	if (g[state][ch] != -1) {
		
		let failure = f[state];

		while (g[failure][ch] == -1)
		failure = f[failure];

		failure = g[failure][ch];
		f[g[state][ch]] = failure;

		out[g[state][ch]] |= out[failure];

		q.push(g[state][ch]);
	}
	}
}

return states;
}

function findNextState(currentState, nextInput) {
	let answer = currentState;
	const ch = nextInput.charCodeAt(0) - 'a'.charCodeAt(0);

	while (g[answer][ch] === -1)
		answer = f[answer];
	return g[answer][ch];
}

function searchWords(arr, k, text) {


	buildMatchingMachine(arr, k);

	let currentState = 0;

	for (let i = 0; i < text.length; ++i) {
		currentState = findNextState(currentState, text[i]);

		if (out[currentState] === 0)
			continue;

      for (let j = 0; j < k; ++j) {
			
        if (out[currentState] & (1 << j) && arr[j]===text.substring(i-arr[j].length+1,i+1))
      { 
				console.log("Word " + arr[j] + " appears from " + (i - arr[j].length + 1) + " to " + i);
				outputWords.push(arr[j]);
			}
		}
	}
}

function preparation(text){
  const specialCharsRegex = /[^a-zA-ZÀ-ÖØ-öø-ÿĀ-ž]/g; ///[!@#$%^&*()_+{}[\]:;<>,.?/\\|~`'"-=©–]/g;
  const conseclines = /(?:\r+|\n+)/g;
  let allText=text;
  allText = allText.replace(specialCharsRegex,' ').replace(conseclines,' ').toString();
  let arr = allText.split(' ').filter(word=>word.length!==0).join(' ').toLowerCase();

    let wordsArray=[...british,...french,...german,...indonesian,...italian,...spanish];

    wordsArray = wordsArray.map(word => word.replace(/\r/g, ''));
    wordsArray=wordsArray.map(word=>word.toLowerCase());
    const expressionRegex =  /[^\p{L}\p{N}_]+/u;

    wordsArray = wordsArray.filter(word => !expressionRegex.test(word));
    wordsArray=wordsArray.filter(word=>word!=="");
    console.log("this is all the text:\n", arr);
    if(wordsArray && wordsArray.length>0)
    {
      MAXS=0;
      wordsArray.forEach(elem => MAXS+=elem.length);
      out = new Array(MAXS).fill(0);
      f = new Array(MAXS).fill(-1);
      g = new Array(MAXS).fill(null).map(() => new Array(MAXC).fill(-1));
      
      const k=wordsArray.length;
      arr=arr.replace(/\s/g,''); 
	  const startTime=performance.now();
      searchWords(wordsArray,k,arr);
	  const endTime=performance.now();
	  console.log(`Performance Time: ${endTime-startTime}`);
    }
  };

 const badWords=[];

const sortDuplicates=(outputWords)=>{
	outputWords.forEach(word=>{
		const foundWord = badWords.find(item => item.word === word);
        if (foundWord) {
            foundWord.occ++;
        } else {
            badWords.push({ word: word, occ: 1 });
        }
	})
}

let nbfilter=0;
const filter=(words)=>{
	words.forEach(({word,occ})=>{
		if(occ>5) nbfilter++;
	})
}
  
  
chrome.storage.local.get('webpageContent', (result) => {
    const content = result.webpageContent;
	if(content && content?.length>0)
        {
			preparation(content);
			sortDuplicates(outputWords);
		}
	console.log("Append");
    const element=document.getElementById("bookmarks");
    const pTag=document.createElement('p');
    pTag.classList.add("title");
    if(badWords.length > 0)
     {
		filter(badWords);
		 pTag.innerText=`The webpage has ${badWords.length} distinct words and filtered ${nbfilter}`;
	}
    else pTag.innerText=`The webpage has 0 bad words.`;
    element.appendChild(pTag);
})