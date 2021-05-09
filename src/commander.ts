import { PrefixLogger } from "./logger/console.ts";
import * as fs from "https://deno.land/x/std/fs/mod.ts";

export class Commander {
    static logger = new PrefixLogger("Strap");

    protected workingDirectory: string = Deno.cwd();
    protected commandOutput: string[] = [];

    get cwd() {
        return this.workingDirectory;
    }

    cd(path: string) {
        this.workingDirectory = path;
        return this;
    }

    /**
     * Change the working directory relative to current working directory.
     */
    cdRel(path: string) {
        this.workingDirectory = `${this.cwd}/${path}`;
        return this;
    }

    mkdir() {
        fs.ensureDirSync(this.cwd);
        return this;
    }

    fullOutput(): string[] {
        return this.commandOutput;
    }

    output(): string {
        return this.fullOutput()[0];
    }

    run(command: string[]) {
        const cmd = Deno.run({
            cmd: command,
            stdout: "piped",
            cwd: this.cwd,
            stderr: "piped",
        });

        cmd.output().then((output) => {
            const outStr = new TextDecoder().decode(output);
            console.log(outStr);
            cmd.close();

            this.commandOutput.push(outStr);
        });

        return this;
    }

    link(fromFile: string, toFile: string) {
        Deno.link(fromFile, toFile).catch((err) => {
            Commander.logger.warn(`Could not create ${toFile}: ${err}`);
        });
        return this;
    }

    /**
     * Write a file relative to the current working directory.
     */
    write(content: string, file: string) {
        Deno.writeTextFileSync(`${this.cwd}/${file}`, content);
    }

    // TODO: make file optional and pull the file name from the url
    writeUrl(url: string, file: string) {
        fetch(url)
            .then((res) => res.text())
            .then((res) => this.write(file, res));
    }
}
