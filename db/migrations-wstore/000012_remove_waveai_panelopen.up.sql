-- FlowTerm 移除 Wave AI 面板：清掉 tab meta 里持久化的面板打开状态，
-- 避免布局初始化时恢复出已移除的面板（前端也已钳制，这里是数据层清理）。
UPDATE db_tab
SET data = json_remove(data, '$.meta."waveai:panelopen"')
WHERE json_type(data, '$.meta."waveai:panelopen"') IS NOT NULL;
