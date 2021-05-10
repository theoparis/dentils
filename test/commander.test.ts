import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Commander } from "../src/commander.ts";

Deno.test("cd to ~/test", () => {
    const commander = new Commander();
    assertEquals(commander.cd("~/test").cwd, "~/test");
})

Deno.test("cd to /etc/nginx", () => {
    const commander = new Commander();
    assertEquals(commander.cd("/etc/nginx").cwd, "/etc/nginx");
})

const commander = new Commander();

Deno.test("cd relative to ./test", () => {
    commander.cd("~/dev").cwd;
    assertEquals(commander.cwd, "~/dev");
    commander.cd("test");
    assertEquals(commander.cwd, "~/dev/test");
})
