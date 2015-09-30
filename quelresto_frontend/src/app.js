import {Router} from "aurelia-router";

export class App {
  static inject() { return [Router]; }

  constructor(router) {
    this.router = router;
    this.router.configure(config => {
      config.title = "Quel resto ?";

      config.map([
		{route: ["","welcome"], moduleId: "welcome", nav: true},
		{route: "tirage", moduleId: "tirage", nav: false}
      ]);
    });
  }
}