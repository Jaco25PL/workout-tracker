let _id = Date.now();

export function uid() {
  return ++_id;
}
