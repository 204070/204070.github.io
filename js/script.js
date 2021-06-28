let prompt_prefix = `[[b;blue;]@204070.github.io]:~$ `;

const interpreter = {
  about: function () {
    // Prints out long diatribe of why
  },
  blog: function () {
    window.open("/blog", "_blank");
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
    //   this.login(function (user, password, callback) {
    //     // this is just example in real applications check need to be on the server
    //     // and token should be unique value generated on the server that you can
    //     // be checked if it's valid by server
    //     if (user === "john" && password === "connor") {
    //       callback("SKYNET");
    //     } else {
    //       callback(null);
    //     }
    //   });
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
