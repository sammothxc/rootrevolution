# notes.md
My file for taking notes throughout the CS260 course

## GitHub
#### Things I learned:
- How to handle merge conflicts using commands like `git fetch`, `git status`, and `git pull`
- What forking someone else's repository does
- What Markdown is and how to use it in .md files

## AWS - EC2
- SSH Command: `ssh -i ~/.ssh/keypair.pem ubuntu@52.205.244.9`
- IP Address: `52.205.244.9`
- EC2 class AMI ID: `ami-0b009f6c56cdd83ed`
- Region: US East (N. Virginia) - `us-east-1`

## Domain Name
- My domain: `rootrevolution.store`
- DNS records link what is typed in the record name to the IP specified in the record
- NS or nameservers store and organize DNS records

## HTTPS, TLS, and certificates
- Caddy has ACME support built into it by default
- `port 443` is the port for https
- the lock icon by the address bar indicates https

## HTML Structure
- Links:
```
<a href="https://www.byu.edu/">BYU</a>
```
- Headers:
```
<h1>text here</h1>
<!--you can use h followed by 1 thru 6-->
```
## HTML Input
| Element    | Meaning                          | Example                                        |
| ---------- | -------------------------------- | ---------------------------------------------- |
| `form`     | Input container and submission   | `<form action="form.html" method="post">`      |
| `fieldset` | Labeled input grouping           | `<fieldset> ... </fieldset>`                   |
| `input`    | Multiple types of user input     | `<input type="" />`                            |
| `select`   | Selection dropdown               | `<select><option>1</option></select>`          |
| `optgroup` | Grouped selection dropdown       | `<optgroup><option>1</option></optgroup>`      |
| `option`   | Selection option                 | `<option selected>option2</option>`            |
| `textarea` | Multiline text input             | `<textarea></textarea>`                        |
| `label`    | Individual input label           | `<label for="range">Range: </label>`           |
| `output`   | Output of input                  | `<output for="range">0</output>`               |
| `meter`    | Display value with a known range | `<meter min="0" max="100" value="50"></meter>` |

## HTML Media
- Canvas:
```
<canvas id="canvasDemo" width="300" height="200" style="border: 1px solid #000000"></canvas>
<script>
  const ctx = document.getElementById('canvasDemo').getContext('2d');
  ctx.beginPath();
  ctx.arc(150, 100, 50, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'red';
  ctx.fill();
  ctx.stroke();
</script>
```
- Scalable Vector Graphics:
```
<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" stroke="red" fill="red" style="border: 1px solid #000000">
  <circle cx="150" cy="100" r="50" />
</svg>
```
- Video:
```
<video controls width="300" crossorigin="anonymous">
  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
</video>
```
- Audio:
```
<audio controls src="testAudio.mp3"></audio>
```
- Image:
```
<img alt="mountain landscape" src="https://images.pexels.com/photos/164170/pexels-photo-164170.jpeg" />
```

## CSS Practice
- Any declaration property defined at a lower level will override the higher declaration
- CSS defines everything as boxes. When you apply styles, you are applying them to a region of the display that is a rectangular box
- Any element can have zero or more classifications applied to it
- Pseudo selectors select based on positional relationships, mouse interactions, hyperlink visitation states, and attributes

## HTML
- favicons can be pngs, all you need to do is link them in the head of the html file
- the `title` tag is what is displayed in the browser tab
- `<img>` tags can have a size attribute that is a percentage of the screen size
- the `alt` attribute is used to describe the image if it cannot be displayed
- elements really can be named anything, but it is best to stick to semantic names
- you can escape characters in html using `&` followed by the character's name and a semicolon

## CSS flex
- `flex: 0 80px` - Zero means it will not grow and 80px means it has a starting basis height of 80 pixels, a fixed size box
- `flex: 1` - One means it will get one fractional unit of growth
- media queries drop the header and footer if the viewport gets too short, and orient the main sections as rows if it gets too narrow

## JavaSript Arrays
- "example is the best teacher"
  ```
  function testAll(input, tester) {
    const result = input.every(tester);
    return result;
  }
  
  const result = testAll(["apple", "banana", "orange"], item => item.length > 3);
  
  console.log(result);
  ```
  
## JavaScript Promises
- used for running things "in parallel"

## JavaScript Async/Await
- a shorter/simpler way of using promises

## Fetch
- Has good Chuck Norris jokes: `https://api.chucknorris.io/jokes/random`

## Express Service
- Acts like a type of "middleware" to handle requests

## Atlas DB
- MongoDB cloud service
- Handy for storing data like user info and authentication data
- Hostname: `cluster0.8etcjqp.mongodb.net`