export interface conceptsInterface {
  getAll: string
  getName: string
  addNew: string
  changePriority: string
  changeType: string
  changeName: string
  changeDescription: string
  remove: string
}
export const conceptsQueries: conceptsInterface = {
  "getAll": "SELECT * FROM `knowledge_concepts` WHERE `knowledge_id` = ? ORDER BY `priority` DESC; ",
  "getName": "SELECT `id` FROM `knowledge_concepts` WHERE `knowledge_id` = ? AND `name` = ?; ",
  "addNew": "INSERT INTO `knowledge_concepts` (`knowledge_id`, `type`, `name`, `priority`, `description`) VALUES (?, ?, ?, ?, ?); ",
  "changePriority": "UPDATE `knowledge_concepts` SET `priority` = ? WHERE `id` = ?; ",
  "changeType": "UPDATE `knowledge_concepts` SET `type` = ? WHERE `id` = ?; ",
  "changeName": "UPDATE `knowledge_concepts` SET `name` = ? WHERE `id` = ?; ",
  "changeDescription": "UPDATE `knowledge_concepts` SET `description` = ? WHERE `id` = ?; ",
  "remove": "DELETE FROM `knowledge_concepts` WHERE `id` = ?; "
};
