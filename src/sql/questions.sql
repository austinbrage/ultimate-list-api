-- getAll
    SELECT * FROM `research_questions`
    WHERE `research_id` = ?
    ORDER BY `priority` DESC;

-- getName
    SELECT `id` FROM `research_questions`
    WHERE `research_id` = ? AND `name` = ?;

-- addNew    
    INSERT INTO `research_questions` (`research_id`, `name`, `priority`, `description`)
    VALUES (?, ?, ?, ?);
    
-- changePriority
    UPDATE `research_questions`
    SET `priority` = ?
    WHERE `id` = ?;

-- changeName
    UPDATE `research_questions`
    SET `name` = ?
    WHERE `id` = ?;
    
-- changeDescription
    UPDATE `research_questions`
    SET `description` = ?
    WHERE `id` = ?;
    
-- remove
    DELETE FROM `research_questions`
    WHERE `id` = ?;
    