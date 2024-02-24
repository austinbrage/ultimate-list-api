export interface knowledgeInterface {
  getAll: string
  getName: string
  addNew: string
  changePriority: string
  changeType: string
  changeName: string
  changeDescription: string
  remove: string
}
export const knowledgeQueries: knowledgeInterface = {
  "getAll": "SELECT * FROM `knowledge` WHERE `user_id` = ? ORDER BY `priority` DESC; ",
  "getName": "SELECT `id` FROM `knowledge` WHERE `user_id` = ? AND `name` = ?; ",
  "addNew": "INSERT INTO `knowledge` (`user_id`, `type`, `name`, `priority`, `description`) VALUES (?, ?, ?, ?, ?); ",
  "changePriority": "UPDATE `knowledge` SET `priority` = ? WHERE `id` = ?; ",
  "changeType": "UPDATE `knowledge` SET `type` = ? WHERE `id` = ?; ",
  "changeName": "UPDATE `knowledge` SET `name` = ? WHERE `id` = ?; ",
  "changeDescription": "UPDATE `knowledge` SET `description` = ? WHERE `id` = ?; ",
  "remove": "DELETE FROM `knowledge` WHERE `id` = ?; "
};
