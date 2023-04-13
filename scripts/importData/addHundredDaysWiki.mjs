// first manually open https://mostlai.github.io/HD-WIKI/ and export as tiddlers.json JSON to your `~/Downloads` folder
const tiddlers = await fs.readJSON(path.join(os.homedir(), 'Downloads', 'tiddlers.json'));
await fs.mkdirp('demo/tiddlers/HD-WIKI');
await Promise.all(
  tiddlers
    .map((tiddler) => {
      let content = Object.keys(tiddler)
        .filter((key) => key !== 'text')
        .map((key) => {
          if (key === 'title') return `${key}: ${replaceSomeTitle(tiddler[key])}`;
          return `${key}: ${tiddler[key]}`;
        })
        .join('\n');
      content += `\n\n${tiddler.text}`;
      return { title: replaceSomeTitle(tiddler.title), content };
    })
    .map(({ title, content }) => fs.writeFile(path.join('demo/tiddlers/HD-WIKI', `${title}.tid`), content)),
);

function replaceSomeTitle(title) {
  if (title === 'Wiki') return 'HundredDaysWiki';
  return title.replace('/', '_');
}
