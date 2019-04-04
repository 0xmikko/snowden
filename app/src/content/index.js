import React from 'react';
import {createUIStore} from 'redux-webext';
import * as actions from "../actions"

console.log("CONTENT SCRIPT STARTED")

let store, prevText = undefined

const updateContent = () => {
	const paragraphs = document.getElementsByTagName("p");
	const paragraphsList = Array.prototype.slice.call(paragraphs);
	const texts = [];
	paragraphsList.forEach(element => element.outerText.startsWith("TEST") ? texts.push(element.outerText) : null);

	if (JSON.stringify(prevText) !== JSON.stringify(texts)) {
		prevText = texts;
		store.dispatch({type: actions.CHECK_PAGE, content: texts})
	}
}

async function initApp() {

	store = await createUIStore();
	console.log("HIIIII")

	document.addEventListener("scroll", updateContent);
}

initApp();
