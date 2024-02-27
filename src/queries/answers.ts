export interface answersInterface {
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
export const answersQueries: answersInterface = {
  "getAll": "SELECT * FROM `research_question_answers` WHERE `question_id` = ? ORDER BY `priority` DESC; ",
  "getName": "SELECT `id` FROM `research_question_answers` WHERE `question_id` = ? AND `name` = ?; ",
  "getLastPriority": "SELECT `priority` FROM `research_question_answers` WHERE `question_id` = ? ORDER BY `priority` DESC LIMIT 1; ",
  "addNew": "INSERT INTO `research_question_answers` (`question_id`, `type`, `name`, `priority`, `description`) VALUES (?, ?, ?, ?, ?); ",
  "changePriority": "UPDATE `research_question_answers` SET `priority` = ? WHERE `id` = ?; ",
  "changeType": "UPDATE `research_question_answers` SET `type` = ? WHERE `id` = ?; ",
  "changeName": "UPDATE `research_question_answers` SET `name` = ? WHERE `id` = ?; ",
  "changeDescription": "UPDATE `research_question_answers` SET `description` = ? WHERE `id` = ?; ",
  "remove": "DELETE FROM `research_question_answers` WHERE `id` = ?; "
};
