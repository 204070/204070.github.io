import type { Command } from './Terminal';

export const aboutCommand: Command = {
  name: 'about',
  description: 'Read more about 204070 shell.',
  execute: (args, terminal) => {
    terminal.writeln('Hello Friend, Welcome to my little corner of the web.');
    terminal.writeln('');
    terminal.writeln('The web can be a big and scary place but you\'re always welcome and invited here..');
    terminal.writeln('');
    terminal.writeln('This is supposed to be my own little sanctuary where I put everything about me; that\'s why I\'ve made it a "shell"');
    terminal.writeln('"Why a shell, why not create a colorful and more modern space?" you may ask; Well... The simple answer is that a "shell" holds sentimental value to me');
    terminal.writeln('The literal and metaphorical meaning of a shell and how it applies here pleases me. It gives me joy.');
    terminal.writeln('');
    terminal.writeln('Anyways, the goal of this site is to create a space where I\'ll have all my connections to the web.');
    terminal.writeln('I don\'t like how my data is scattered all over the web and I would just love to centralize and organize everything myself.');
    terminal.writeln('I won\'t mind having all my interactions from here, that means all chats and calls and any commentaries on my life and work will be from here. That may end up not been feasible but we\'ll see.');
    terminal.writeln('');
    terminal.writeln('Something else I want to work on soon is creating a very portable Operating System that will help me document, timestamp and classify all my web interactions (search history, location history, work history, things I like, things I don\'t like, maybe even my mental state e.t.c.)');
    terminal.writeln('Don\'t know how it\'ll work yet, I\'m thinking forking and customizing chromium OS might work but we\'ll see.');
    terminal.writeln('');
    terminal.writeln('I\'ll just stop for now. I\'ll put all this in a blog post later.');
    terminal.writeln('You can buzz me if you want to talk about it.');
    terminal.writeln('');
    terminal.writeln('Thanks for coming. Please feel free to look around and enjoy yourself.');
    terminal.writeln('');
    terminal.writeln('Have a nice day :).');
  }
};

export const blogCommand: Command = {
  name: 'blog',
  description: 'View my blog.',
  execute: (args, terminal) => {
    window.open('/blog', '_blank');
  }
};

export const chatCommand: Command = {
  name: 'chat',
  description: 'Chat with me or leave a message.',
  execute: (args, terminal) => {
    terminal.writeln('You can reach me through any of the following:');
    terminal.writeln('');
    terminal.writeln('email\t\tlere.akinwunmi@gmail.com');
    terminal.writeln('twitter\t\thttps://twitter.com/@smai_lee');
    terminal.writeln('linkedin\thttps://linkedin.com/in/oluwaseun-akinwunmi-ng/');
  }
};

export const clearCommand: Command = {
  name: 'clear',
  description: 'Clear the terminal output.',
  execute: (args, terminal) => {
    terminal.term.clear();
  }
};

export const helpCommand: Command = {
  name: 'help',
  description: 'Display a list of shell commands.',
  execute: (args, terminal) => {
    terminal.writeln('This is the help menu, you can see a list of useful commands and their description.');
    terminal.writeln('');
    const commands = terminal.getCommands().sort((a, b) => a.name.localeCompare(b.name));
    for (const cmd of commands) {
      // pad name to keep descriptions aligned
      const paddedName = cmd.name.padEnd(16, ' ');
      terminal.writeln(`${paddedName}${cmd.description}`);
    }
  }
};

export const loginCommand: Command = {
  name: 'login',
  description: 'Authorize you to use privileged commands. (Contact me to create an account).',
  execute: (args, terminal) => {
    terminal.writeln('Authorize you to use privileged commands. (Contact me to create an account).');
  }
};

export const projectsCommand: Command = {
  name: 'projects',
  description: 'View some of my projects.',
  execute: (args, terminal) => {
    window.open('/portfolio', '_blank');
  }
};

export const resumeCommand: Command = {
  name: 'resume',
  description: 'View my resume.',
  execute: (args, terminal) => {
    window.open('/resume.pdf', '_blank');
  }
};
