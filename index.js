class Between {
  #A;
  #B;
  #chars = new Array();

  constructor (text, A, B)
  {
    this.text = text;
    this.#A = A;
    this.#B = B;
    this.chars = text.split("").map((i, ii) => { return ` ${ii}__${i} ` });
    text.split("").map(t => this.#chars.push(t));
  }

  get()
  {
    let matchingA = [];
    [...this.text.matchAll(this.#A)].map(i => {
      matchingA.push({ code: i[0], index: i.index.length })
    });
    let matchingB = [];
    [...this.text.matchAll(this.#B)].map(i => {
      matchingB.push({ code: i[0], index: i.index + i[0].length })
    });
    if(matchingA.length !== matchingB.length) return { error: true, description: "No match closing tags" };
    let cursorA = matchingA.length - 1;
    let cursorB = 0;
    let tokens = [];
    console.log(matchingA, matchingB, cursorA, cursorB)
    while (cursorA >= 0)
    {
      tokens.push(this.text.substring(matchingA[cursorA]["index"], matchingB[cursorB]["index"]).trim());
      cursorA --;
      cursorB ++;
    }
    console.log(tokens[0], "\n\n_____________\n\n", tokens[1]);

  }

  
  /**
   * @param  {string} token
   */
  #validateToken (token)
  {
    if(token.endsWith(this.#A)){
      return true;
    };
  }

}

const between = new Between(require("fs").readFileSync("./nana").toString(), "function (.*) \\(\\)((.|\n|\r)*?) ?{", "}");
between.get();
console.log("\x1b[31m", JSON.stringify({ text: between.chars.join("") }),'\x1b[0m');
