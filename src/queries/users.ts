export interface usersInterface {
  getId: string
  getByEmail: string
  getByExternalId: string
  getAll: string
  getIdPassword: string
  getName: string
  getEmail: string
  getNickname: string
  addNew: string
  changeExternalId: string
  changeName: string
  changePassword: string
  changeNickname: string
  changeEmail: string
  remove: string
}
export const usersQueries: usersInterface = {
  "getId": "SELECT `id` FROM `users` WHERE `api_key` = ?; ",
  "getByEmail": "SELECT `id` FROM `users` WHERE `email` = ?; ",
  "getByExternalId": "SELECT `id` FROM `users` WHERE `auth_provider` = ? AND `external_id` = ?; ",
  "getAll": "SELECT `id`, `name`, `email`, `nickname`, `api_key` FROM `users` WHERE `id` = ?; ",
  "getIdPassword": "SELECT `id`, `password` FROM `users` WHERE `name` = ?; ",
  "getName": "SELECT `name` FROM `users` WHERE `name` = ?; ",
  "getEmail": "SELECT `email` FROM `users` WHERE `email` = ?; ",
  "getNickname": "SELECT `nickname` FROM `users` WHERE `nickname` = ?; ",
  "addNew": "INSERT INTO `users` (`name`, `password`, `email`, `nickname`, `auth_provider`, `external_id`) VALUES (?, ?, ?, ?, ?, ?); ",
  "changeExternalId": "UPDATE `users` SET `auth_provider` = ?, `external_id` = ? WHERE `email` = ?; ",
  "changeName": "UPDATE `users` SET `name` = ? WHERE `id` = ?; ",
  "changePassword": "UPDATE `users` SET `password` = ? WHERE `id` = ?; ",
  "changeNickname": "UPDATE `users` SET `nickname` = ? WHERE `id` = ?; ",
  "changeEmail": "UPDATE `users` SET `email` = ? WHERE `id` = ?; ",
  "remove": "DELETE FROM `users` WHERE `id` = ?; "
};
