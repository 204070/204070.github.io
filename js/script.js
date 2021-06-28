let prompt_prefix = `[[b;blue;]@204070.github.io]:~$ `;

const interpreter = {
  about: function () {
    // Prints out long diatribe of why
    this.echo(`
Hello Friend, Welcome to my little corner of the web.

The web can be a big and scary place but you're always welcome and invited here..

This is supposed to be my own little sanctuary where I put everything about me; that's why I've made it a "shell"
"Why a shell, why not create a colorful and more modern space?" you may ask; Well... The simple answer is that a "shell" holds sentimental value to me
The literal and metaphorical meaning of a shell and how it applies here pleases me. It gives me joy.

Anyways, the goal of this site is to create a space where I'll have all my connections to the web.
I don't like how my data is scattered all over the web and I would just love to centralize and organize everything myself. 
I won't mind having all my interactions from here, that means all chats and calls and any commentaries on my life and work will be from here. That may end up not been feasible but we'll see.

Something else I want to work on soon is creating a very portable Operating System that will help me document, timestamp and classify all my web interactions (search history, location history, work history, things I like, things I don't like, maybe even my mental state e.t.c.)
Don't know how it'll work yet, I'm thinking forking and customizing chromium OS might work but we'll see.

I'll just stop for now. I'll put all this in a blog post later.
You can buzz me if you want to talk about it.

Thanks for coming. Please feel free to look around and enjoy yourself.

Have a nice day :).
	`);
  },
  blog: function () {
    window.open(`/blog?tid=${this.id()}`, "_blank");
  },
  chat: function () {
    // opens a new terminal window with websocket chat
    this.echo("You can reach me through any of the following:");
    this.echo(`
	email		lere.akinwunmi@gmail.com
	twitter		https://twitter.com/@smai_lee
	linkedin	https://linkedin.com/in/oluwaseun-akinwunmi-ng/
	`);
  },
  help: function () {
    this.echo(
      "This is the help menu, you can see a list of useful commands and their description."
    );
    this.echo(`
	about			Read more about 204070 shell.
	blog			View my blog. (Blog has access control, login to get personalized content).
	chat			Chat with me or leave a message.
	help			Display a list of shell commands.
	login			Authorize you to use privileged commands. (Contact me to create an account).
	projects		View some of my projects.
	resume			View my resume.
`);
  },
  login: function () {
    if (this.get_token()) {
      this.error("you're already logged in");
    }
    this.login(function (user, password, callback) {
      // this is just example in real applications check need to be on the server
      // and token should be unique value generated on the server that you can
      // be checked if it's valid by server
      if (user === "john" && password === "connor") {
        callback("SKYNET");
      } else {
        callback(null);
      }
    });
  },
  projects: function () {
    window.open("/portfolio", "_blank");
  },
  resume: function () {
    window.open("/resume.pdf", "_blank");
  },
};

$(function () {
  $("#terminal").terminal(interpreter, {
    greetings: `
Welcome to 204070 shell

jQueryTerminal v2.26.0. Copyright (c) 2011-2021 Jakub T. Jankiewicz <https://jcubic.pl/me>
Type 'help' to see shell commands list.

	`,
    prompt: function (callback) {
      if (this.get_token()) {
        callback(`${this.login_name()}${prompt_prefix}`);
      } else {
        callback(`[[b;green;]guest]${prompt_prefix}`);
      }
    },
  });
});
