function createTestTask(id, title) {
  return {
    id,
    title,
  };
}
/**
 *
 * @param taskTitles {string[]}
 */
export default function createTestTasks(taskTitles) {
  const result = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < taskTitles.length; i++) {
    result.push(createTestTask(i + 1, taskTitles[i]));
  }
  return result;
}
