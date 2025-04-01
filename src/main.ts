import { Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  template: `
    <div class="hero">
      <h1>gibsonj.net</h1>
      <p>Welcome to my corner of the web</p>
    </div>

    <div class="content">
      <section class="section">
        <h2>About Me</h2>
        <p>
          Hello! I'm passionate about creating meaningful experiences and
          pushing the boundaries of what's possible. Like the mountains that
          inspire me, I believe in reaching new heights and conquering
          challenges.
        </p>
      </section>

      <section class="section">
        <h2>Go Further</h2>
        <p>
          These days you can find me at
          <a href="https://gibsonops.com" target="_blank">gibsonops.com</a>.
        </p>
      </section>
    </div>

    <footer>
      <p>© {{ currentYear }} gibsonj.net | All rights reserved</p>
    </footer>
  `,
})
export class App {
  currentYear = new Date().getFullYear();
}

bootstrapApplication(App);
