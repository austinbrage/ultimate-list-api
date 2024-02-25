-- getAll
    SELECT * FROM `researchs`
    WHERE `user_id` = ?
    ORDER BY `priority` DESC;

-- getName
    SELECT `id` FROM `researchs`
    WHERE `user_id` = ? AND `name` = ?;

-- addNew    
    INSERT INTO `researchs` (`user_id`, `type`, `name`, `priority`, `description`)
    VALUES (?, ?, ?, ?, ?);

-- changePriority
    UPDATE `researchs`
    SET `priority` = ?
    WHERE `id` = ?;
    
-- changeType
    UPDATE `researchs`
    SET `type` = ?
    WHERE `id` = ?;

-- changeName
    UPDATE `researchs`
    SET `name` = ?
    WHERE `id` = ?;
    
-- changeDescription
    UPDATE `researchs`
    SET `description` = ?
    WHERE `id` = ?;

-- remove
    DELETE FROM `researchs`
    WHERE `id` = ?;
