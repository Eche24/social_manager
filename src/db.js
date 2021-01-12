import Datastore from "nedb-promises";
import path from "path";
import { remote } from "electron";

const users = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath("userData"), "/users.db")
});
const profiles = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath("userData"), "/profiles.db")
});

const pages = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath("userData"), "/pages.db")
});

const posts = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath("userData"), "/posts.db")
});

export default {
  users,
  profiles,
  pages,
  posts
};
