import FileSaver from "file-saver";
import { surpriseMePrompts, surpriseMePromptsBr } from "../constant";

export function getRandomPrompt(prompt, br) {
  var randomIndex = 0;
  var randomPrompt = "";
  if (br) {
    randomIndex = Math.floor(Math.random() * surpriseMePromptsBr.length);
    randomPrompt = surpriseMePrompts[randomIndex];
  } else {
    randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    randomPrompt = surpriseMePromptsBr[randomIndex];
  }

  if (randomPrompt === prompt) return getRandomPrompt(prompt, br);

  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
