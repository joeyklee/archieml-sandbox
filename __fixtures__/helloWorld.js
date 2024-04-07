export const textInGoogleDoc = `
Hello world

[.body]
[.header1]
text: i love you
[.formatting]
type:bold
[]
[]
[.paragraph]
text: I love archieml
[.formatting]
type:bold
[]
[]

[]

`;

export const parsedArchiemlDoc = {
  body: [
    {
      header1: [{ text: "i love you", formatting: [{ type: "bold" }] }],
      paragraph: [{ text: "I love archieml", formatting: [{ type: "bold" }] }],
    },
  ],
};
