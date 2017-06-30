export function shuffle(arr) {
  let copy = arr.slice();
  for (let i = 0; i < copy.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}
