export const defaultMarkdown = `# Markdown Syntax Guide

## Headers

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

---

## Emphasis

*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

_You **can** combine them_

~~This text will be strikethrough~~

---

## Lists

### Unordered

* Item 1
* Item 2
  * Item 2a
  * Item 2b
    * Item 3a
    * Item 3b

### Ordered

1. Item 1
2. Item 2
3. Item 3
   1. Item 3a
   2. Item 3b

### Task List

- [x] Task 1 (completed)
- [x] Task 2 (completed)
- [ ] Task 3 (pending)
- [ ] Task 4 (pending)

---

## Links

[GitHub](https://github.com)

[Google](https://google.com "Google Homepage")

Automatic link: https://example.com

---

## Images

![Alt text](/placeholder.svg)

---

## Blockquotes

> Markdown is a lightweight markup language.
>
> It is widely used for documentation and README files.

---

## Code

### Inline Code

Use \`console.log('Hello World')\` to print to the console.

### Code Block

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return \`Welcome to Markdown Preview Live\`;
}

greet('Developer');
\`\`\`

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))
\`\`\`

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello</title>
  </head>
  <body>
    <h1>Markdown Preview Live</h1>
  </body>
</html>
\`\`\`

---

## Tables

| Feature        | Status |
|----------------|--------|
| Live Preview   | ✅      |
| Dark Mode      | ✅      |
| Sync Scroll    | ✅      |
| Export PDF     | ✅      |
| GFM Support    | ✅      |

---

## Horizontal Rule

Three or more dashes:

---

Three or more asterisks:

***

Three or more underscores:

___

---

## HTML in Markdown

<details>
<summary>Click to expand</summary>

This content is hidden by default.

</details>

---

Happy writing! ✍️
`;
