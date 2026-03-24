---
title: "Setting up an Android Development Environment Part 2"
description: "Essential commands and tools for your Android development environment - a quick start guide"
pubDate: "Apr 01 2018"
heroImage: "../../assets/AndroidDE.png"
---

This is the second part in the series.

After part 1, you should have a functional development environment on your Android device. This part is like a quick start manual for your development environment.

If you are already familiar with the Linux terminal commands, Tmux and Vim you can skip to Part 3 as a boss 🖖.

For those of us who are not quite bosses yet, here are some of the useful commands I've used while running my mobile development environment.

### Linux Commands

Here are essential commands you'll use daily:

**File and Directory Operations:**

-   `ls` - list files and directories
-   `cd` - change directory
-   `mkdir` - create directory
-   `rmdir` - remove empty directory
-   `rm` - remove files
-   `cp` - copy files
-   `mv` - move/rename files

**File Content:**

-   `cat` - display file content
-   `head` - show first lines of a file
-   `tail` - show last lines of a file
-   `grep` - search text patterns
-   `find` - find files and directories

**System Information:**

-   `ps` - show running processes
-   `top` - display system processes
-   `df` - show disk usage
-   `free` - show memory usage

### VIM

Vim is a powerful text editor that's perfect for mobile development:

**Basic Navigation:**

-   `h, j, k, l` - move left, down, up, right
-   `w` - move forward by word
-   `b` - move backward by word
-   `0` - beginning of line
-   `$` - end of line

**Editing:**

-   `i` - insert mode
-   `a` - append after cursor
-   `o` - open new line below
-   `x` - delete character
-   `dd` - delete line
-   `yy` - copy line
-   `p` - paste

**Saving and Exiting:**

-   `:w` - save file
-   `:q` - quit
-   `:wq` - save and quit
-   `:q!` - quit without saving

### tmux

Tmux allows you to manage multiple terminal sessions:

**Session Management:**

-   `tmux new -s session_name` - create new session
-   `tmux ls` - list sessions
-   `tmux attach -t session_name` - attach to session
-   `tmux kill-session -t session_name` - kill session

**Window Management:**

-   `Ctrl+b c` - create new window
-   `Ctrl+b n` - next window
-   `Ctrl+b p` - previous window
-   `Ctrl+b &` - kill window

**Pane Management:**

-   `Ctrl+b %` - split horizontally
-   `Ctrl+b "` - split vertically
-   `Ctrl+b arrow keys` - navigate panes
-   `Ctrl+b x` - close pane

With these commands, you should be able to work productively with your development environment. In case you run into any further problems, don't forget the internet is always there to help. Do a quick search on your favorite search engine and you'll figure things out.

In the next part, we'll go over optimisations to make your development environment truly awesome.

**Ja ne!**
