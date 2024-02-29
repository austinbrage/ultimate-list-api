export interface researchsInterface {
  getAll: string
  getName: string
  getLastPriority: string
  addNew: string
  changePriority: string
  changeType: string
  changeName: string
  changeDescription: string
  remove: string
}
export const researchsQueries: researchsInterface = {
  "getAll": "SELECT * FROM `researchs` WHERE `user_id` = ? ORDER BY `priority` DESC; ",
  "getName": "SELECT `id` FROM `researchs` WHERE `user_id` = ? AND `name` = ?; ",
  "getLastPriority": "SELECT `priority` FROM `researchs` WHERE `user_id` = ? ORDER BY `priority` DESC LIMIT 1; ",
  "addNew": "INSERT INTO `researchs` (`user_id`, `type`, `name`, `priority`, `description`) VALUES (?, ?, ?, ?, ?); ",
  "changePriority": "UPDATE `researchs` SET `priority` = ? WHERE `id` = ?; ",
  "changeType": "UPDATE `researchs` SET `type` = ? WHERE `id` = ?; ",
  "changeName": "UPDATE `researchs` SET `name` = ? WHERE `id` = ?; ",
  "changeDescription": "UPDATE `researchs` SET `description` = ? WHERE `id` = ?; ",
  "remove": "DELETE FROM `researchs` WHERE `id` = ?; "
};
