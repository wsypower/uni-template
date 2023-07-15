/*
 * @Description:
 * @Author: wsy
 * @Date: 2023-07-15 15:10:30
 * @LastEditTime: 2023-07-15 15:27:26
 * @LastEditors: wsy
 */
export const useTitle = () => {
  let oldValue = 'Hello';
  let newValue = 'Word';
  const title = ref(oldValue);
  function changeTitle() {
    oldValue = title.value;
    title.value = newValue;
    newValue = oldValue;
  }
  return {
    title,
    changeTitle
  };
};
