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
  return [...Array(taskTitles.length)]
    .map((_, i) => createTestTask(i + 1, taskTitles[i]));
}
