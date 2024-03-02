-- getAll
    SELECT * FROM `ideas`
    WHERE `user_id` = ?
    ORDER BY `priority` DESC;

-- getName
    SELECT `id` FROM `ideas`
    WHERE `user_id` = ? AND `name` = ?;

-- getLastPriority
    SELECT `priority` FROM `ideas`
    WHERE `user_id` = ?
    ORDER BY `priority` DESC LIMIT 1;

-- addNew    
    INSERT INTO `ideas` (`user_id`, `type`, `name`, `priority`, `description`, `solved_problem`)
    VALUES (?, ?, ?, ?, ?, ?);

-- changePriority
    UPDATE `ideas`
    SET `priority` = ?
    WHERE `id` = ?;
    
-- changeType
    UPDATE `ideas`
    SET `type` = ?
    WHERE `id` = ?;

-- changeName
    UPDATE `ideas`
    SET `name` = ?
    WHERE `id` = ?;
    
-- changeDescription
    UPDATE `ideas`
    SET `description` = ?
    WHERE `id` = ?;
    
-- changeSolvedProblem
    UPDATE `ideas`
    SET `solved_problem` = ?
    WHERE `id` = ?;

-- remove
    DELETE FROM `ideas`
    WHERE `id` = ?;
