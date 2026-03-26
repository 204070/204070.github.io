import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';

export interface Command {
  name: string;
  description: string;
  execute: (args: string[], terminal: XTermWrapper) => void | Promise<void>;
}

export class StateManager {
  private user: string = 'guest';
  private path: string[] = ['~'];

  public getPromptString(): string {
    const green = '\x1b[1;32m';
    const blue = '\x1b[1;34m';
    const reset = '\x1b[0m';
    return `${green}${this.user}@204070.me${reset}:${blue}${this.path.join('/')}${reset}$ `;
  }
}

export class CommandParser {
  private commands: Map<string, Command> = new Map();

  public register(command: Command): void {
    this.commands.set(command.name.toLowerCase(), command);
  }

  public getCommands(): Command[] {
    return Array.from(this.commands.values());
  }

  public async parseAndExecute(rawInput: string, terminal: XTermWrapper): Promise<void> {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    const [cmdName, ...args] = trimmed.split(' ');
    
    const command = this.commands.get(cmdName.toLowerCase());
    if (command) {
      try {
        await command.execute(args, terminal);
      } catch (err) {
        terminal.writeln(`\x1b[31mError executing command: ${err}\x1b[0m`);
      }
    } else {
      terminal.writeln(`\x1b[31mCommand not found: ${cmdName}\x1b[0m`);
    }
  }
}

export class XTermWrapper {
  public term: Terminal;
  public state: StateManager;
  private parser: CommandParser;
  private fitAddon: FitAddon;
  private webLinksAddon: WebLinksAddon;
  
  private inputBuffer: string = '';
  
  // 1. The History State
  private history: string[] = [];
  private historyIndex: number = 0;

  constructor(container: HTMLElement) {
    this.term = new Terminal({
      cursorBlink: true,
      theme: {
        background: '#002B36',
        foreground: '#D3D7CF'
      },
      fontFamily: 'monospace',
      fontSize: 16
    });

    this.state = new StateManager();
    this.parser = new CommandParser();
    this.fitAddon = new FitAddon();
    this.webLinksAddon = new WebLinksAddon();
    this.term.loadAddon(this.fitAddon);
    this.term.loadAddon(this.webLinksAddon);

    this.term.open(container);
    this.fitAddon.fit();

    window.addEventListener('resize', () => {
      this.fitAddon.fit();
    });

    this.setupInputHandler();

    this.writeln('Welcome to 204070 shell\r\n');
    this.writeln("Run 'help' to see shell commands list or click here to switch to the UI <https://204070.me/blog>\r\n");
    this.prompt();
  }

  public registerCommand(command: Command) {
    this.parser.register(command);
  }

  public getCommands() {
    return this.parser.getCommands();
  }

  public write(text: string) {
    this.term.write(text);
  }

  public writeln(text: string) {
    this.term.writeln(text);
  }

  public prompt() {
    this.term.write(this.state.getPromptString());
  }

  private setupInputHandler() {
    this.term.onKey(async ({ key, domEvent }) => {
      const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

      if (domEvent.key === 'Enter') {
        this.term.write('\r\n');
        
        // --- HISTORY LOGIC: SAVE COMMAND ---
        if (this.inputBuffer.trim().length > 0) {
          this.history.push(this.inputBuffer);
        }
        // Reset the index to point to the "new" empty line at the bottom
        this.historyIndex = this.history.length;
        
        await this.parser.parseAndExecute(this.inputBuffer, this);
        
        this.inputBuffer = '';
        this.prompt();

      } else if (domEvent.key === 'Backspace') {
        if (this.inputBuffer.length > 0) {
          this.inputBuffer = this.inputBuffer.slice(0, -1);
          this.term.write('\b \b');
        }

      } else if (domEvent.key === 'ArrowUp') {
        // --- HISTORY LOGIC: GO BACK ---
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.replaceCurrentLine(this.history[this.historyIndex]);
        }

      } else if (domEvent.key === 'ArrowDown') {
        // --- HISTORY LOGIC: GO FORWARD ---
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.replaceCurrentLine(this.history[this.historyIndex]);
        } else if (this.historyIndex === this.history.length - 1) {
          // If they scroll all the way back down to the present, clear the line
          this.historyIndex++;
          this.replaceCurrentLine('');
        }

      } else if (printable && key.length === 1) {
        // We check key.length === 1 to ensure we don't accidentally print 
        // stringified keys like "ArrowRight" or "Shift" to the screen.
        this.inputBuffer += key;
        this.term.write(key);
      }
    });
  }

  /**
   * Helper: Erases the current line, prints the prompt, and inserts new text.
   */
  private replaceCurrentLine(newText: string) {
    // 1. \x1b[2K erases the entire current line.
    // 2. \r moves the cursor to the far left.
    this.term.write('\x1b[2K\r');
    
    // 3. Reprint the prompt
    this.prompt();
    
    // 4. Update our memory and print the historical command
    this.inputBuffer = newText;
    this.term.write(this.inputBuffer);
  }
}
